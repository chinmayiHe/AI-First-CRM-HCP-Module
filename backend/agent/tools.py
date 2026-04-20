import re

def extract_entities(text, prev):
    lower = text.lower()
    data = prev.copy()

    # NAME
    match = re.search(r"dr\.\s*(\w+)", text, re.IGNORECASE)
    if match:
        data["hcp_name"] = "Dr. " + match.group(1).capitalize()

    # INTERACTION TYPE
    if "call" in lower:
        data["interaction_type"] = "Call"
    elif "meeting" in lower or "met" in lower:
        data["interaction_type"] = "Meeting"

    # DATE
    match = re.search(r"(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})", text)
    if match:
        d, m, y = match.groups()
        if len(y) == 2:
            y = "20" + y
        data["date"] = f"{y}-{m.zfill(2)}-{d.zfill(2)}"

    # TIME
    match = re.search(r"(\d{1,2}):(\d{2})", text)
    if match:
        h, mi = match.groups()
        data["time"] = f"{h.zfill(2)}:{mi}"

    # ATTENDEES
    match = re.search(r"with (.*?)(,|$)", text, re.IGNORECASE)
    if match:
        data["attendees"] = match.group(1).strip()

    # SENTIMENT
    if "positive" in lower or "happy" in lower:
        data["sentiment"] = "Positive"
    elif "negative" in lower or "unhappy" in lower:
        data["sentiment"] = "Negative"
    elif "neutral" in lower:
        data["sentiment"] = "Neutral"

    # MATERIALS
    materials = []
    if "brochure" in lower:
        materials.append("Brochure")
    if "leaflet" in lower:
        materials.append("Leaflet")
    if "presentation" in lower:
        materials.append("Presentation")

    if materials:
        data["materials"] = ", ".join(materials)

    # SAMPLES
    match = re.search(r"(\d+)\s*sample", lower)
    if match:
        data["samples"] = match.group(1) + " samples"

    # OUTCOMES
    match = re.search(r"outcome (was|is)? (.*?)(,|$)", lower)
    if match:
        data["outcomes"] = match.group(2).strip().capitalize()

    # FOLLOW-UPS
    match = re.search(r"follow[- ]?up (.*?)(,|$)", lower)
    if match:
        data["followups"] = match.group(1).strip().capitalize()

    # TOPICS
    data["topics"] = text

    return data


def log_interaction(data):
    return data


def edit_interaction(prev, updates):
    prev.update(updates)
    return prev


def generate_summary(data):
    return f"Meeting with {data.get('hcp_name', '')}"


def suggest_followups(data):
    suggestions = []

    if data.get("sentiment") == "Positive":
        suggestions.append("Schedule follow-up meeting")

    if data.get("materials"):
        suggestions.append("Send additional materials")

    if data.get("samples"):
        suggestions.append("Collect feedback on samples")

    return suggestions