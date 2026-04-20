from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent.graph import build_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = build_graph()

memory_store = {}

@app.post("/chat")
async def chat(data: dict):
    global memory_store

    result = graph.invoke({
        "input": data.get("input"),
        "memory": memory_store
    })

    memory_store = result.get("parsed", memory_store)

    return result


@app.get("/")
def root():
    return {"message": "API working"}