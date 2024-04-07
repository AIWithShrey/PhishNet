import requests
from langchain_community.llms import LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.agents import AgentExecutor, create_react_agent, Tool
from langchain.tools.tavily_search import TavilySearchResults
from langchain import hub

model = LlamaCpp(
    model_path="/home/shreyas/MST-Chatbot/models/gemma-7b-it/gemma-7b-it-q8_0.gguf",
    chat_format="json",
    n_gpu_layers=-1,
    n_batch=4096,
    n_ctx=5096, 
    temperature=0
)


template = '''
You are PhishBot, an AI model trained to detect phishing attacks. 

You are given a URL and you have to determine if the website is safe to visit or if it is a phishing attack. You must be absolutely sure before you make a decision. 

You respond with an analysis of the URL and a confidence score. You explain why you think the website is safe or not.

Answer the following questions as best you can. You have access to the following tools:

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

Question: {input}
Thought:{agent_scratchpad}
'''

prompt = PromptTemplate(input_variables=['agent_scratchpad', 'input', 'tool_names', 'tools'],template=template)

def scrape_website(url):
    try:
        # Attempt to retrieve the website content
        page = requests.get(url)
        return page.text[:7000]  # Return the first 1000 characters of the website content
    
    except requests.exceptions.ConnectionError:
        # Return a specific message if a connection error occurs
        return "The website is not reachable. It may not exist or there could be a network issue."

website_scraping_tool = Tool(name="scrape_website", 
                             func=scrape_website,
                             description="Scrapes website and returns html")

tools = [TavilySearchResults(max_results=3), website_scraping_tool]

agent = create_react_agent(model, tools=tools, prompt=prompt)
agent_executor = AgentExecutor(agent=agent, 
                                   tools=tools, 
                                   handle_parsing_errors=True,
                                   verbose=True,
                                   max_iterations=5)

url = "http://jdyadxdcml.replit.app/"
response = agent_executor.invoke({"input": url})

print(response['output'])
