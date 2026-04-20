from langgraph.graph import StateGraph
from agent.tools import extract_entities, log_interaction, edit_interaction, suggest_followups

def chatbot_node(state):
    text = state.get("input", "")
    prev = state.get("memory", {})

    data = extract_entities(text, prev)

    # detect edit
    if "update" in text.lower() or "change" in text.lower():
        data = edit_interaction(prev, data)
    else:
        data = log_interaction(data)

    # add AI suggestions
    data["suggestions"] = suggest_followups(data)

    return {"parsed": data}


def build_graph():
    graph = StateGraph(dict)

    graph.add_node("chatbot", chatbot_node)

    graph.set_entry_point("chatbot")

    return graph.compile()