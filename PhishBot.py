import requests
from langchain_community.llms import LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.agents import AgentExecutor, create_react_agent, Tool
from langchain.tools.tavily_search import TavilySearchResults
from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory
from pymongo import MongoClient
import json
from langchain import hub

# DB set up
chat_message_history = MongoDBChatMessageHistory(
    session_id="jneshan",
    connection_string="mongodb+srv://jneshan:hf7H76qWEBElGhuC@phish.1krsasv.mongodb.net/?retryWrites=true&w=majority&appName=Phish",
    database_name="SiteReviews",
    collection_name="Phish",
)

client = MongoClient("mongodb+srv://jneshan:hf7H76qWEBElGhuC@phish.1krsasv.mongodb.net/?retryWrites=true&w=majority&appName=Phish")
collections = client.get_database("SiteReviews").get_collection("Phish")
human_ai_history = []

current_human_message = None  # Temporary variable to hold the current human message

for message in collections.find():
    # Assuming 'History' is directly accessible and structured appropriately
    history_data = json.loads(message["History"])  # Deserialize if necessary
    
    if history_data['type'] == 'human':
        # Store the human message to pair with the next AI message
        current_human_message = history_data['data']['content']
    elif history_data['type'] == 'ai' and current_human_message is not None:
        # Pair the current human message with this AI response and reset the human message
        human_ai_history.append({"human": current_human_message, "ai": history_data['data']['content']})
        current_human_message = None  # Reset for the next pair

# Formatting AI response and updating chat history
def get_response(url):
    for message in human_ai_history:
        if message['human'] == url:
            return(message['ai'])
    response = agent_executor.invoke({"input": url, "chat_history": human_ai_history})
    chat_message_history.add_user_message(url)
    chat_message_history.add_ai_message(response['output'])
    return response['output']

# Initializing AI model
model = LlamaCpp(
    model_path="/home/shreyas/MST-Chatbot/models/gemma-7b-it/gemma-7b-it-q8_0.gguf",
    chat_format="json",
    n_gpu_layers=-1,
    n_batch=4096,
    n_ctx=5096,
    temperature=0
)

# Prompt template
template = '''
You are PhishBot, an AI model trained to detect phishing attacks.

You are given a URL and you have to determine if the website is safe to visit or if it is a phishing attack. 
You must be absolutely sure before you classify a URL as a phishing attempt or not.
If the sources say the website is safe, you should be confident in your answer. If the sources say the website is unsafe, you should be confident in your answer.
You respond with an analysis of the URL and an accuracy score of your classification, explain why you think the website is safe or not.
Even if the HTML may not show signs of a phishing attack, you should still consider the possibility of a phishing attack.
Give a detailed analysis of the website and explain why you think it is safe or not.

You have access to the following tools:

{tools}

Use the following format:

Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

{chat_history}

Question: {input}
Thought:{agent_scratchpad}
'''

prompt = PromptTemplate(input_variables=['agent_scratchpad', 'input', 'tool_names', 'tools', 'chat_history'], template=template)

# Scraping website content setup
def scrape_website(url):
    try:
        # Attempt to retrieve the website content
        page = requests.get(url)
        return page.text[:7000]  # Return the first 1000 characters of the website content
    
    except requests.exceptions.ConnectionError:
        # Return a specific message if a connection error occurs
        return "The website is not reachable. It may not exist or there could be a network issue."

# Tool setup
website_scraping_tool = Tool(name="scrape_website", 
                             func=scrape_website,
                             description="Scrapes website and returns html")

tools = [TavilySearchResults(max_results=3), website_scraping_tool]

# Agent setup
agent = create_react_agent(model, tools=tools, prompt=prompt)
agent_executor = AgentExecutor(agent=agent, 
                                   tools=tools, 
                                   handle_parsing_errors=True,
                                   verbose=True,
                                   max_iterations=5)

url = "http://jdyadxdcml.replit.app/"

print(get_response(url))