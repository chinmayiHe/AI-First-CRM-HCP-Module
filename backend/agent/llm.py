from langchain_groq import ChatGroq

def get_llm():
    return ChatGroq(
        model="gemma2-9b-it",
        api_key="YOUR_GROQ_API_KEY"
    )