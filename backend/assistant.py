import cohere
import uuid
import json
import hnswlib
from typing import List, Dict
from unstructured.partition.html import partition_html
from unstructured.chunking.title import chunk_by_title


co = cohere.Client('1a1FLfJORcDdgZNi7YZVY091ihLPJytnYN8W5H9R')
conversation_id = str(uuid.uuid4())

class Documents:

    def __init__(self, sources: List[Dict[str, str]]):
        self.sources = sources
        self.docs = []
        self.docs_embs = []
        self.retrieve_top_k = 10
        self.rerank_top_k = 3
        self.load()
        self.embed()
        self.index()


# Define the preamble
preamble_override = "You are an expert travel agent"


print('Starting the chat. Type "quit" to end.\n')

while True:

    # User message
    message = input("User: ")

    # Typing "quit" ends the conversation
    if message.lower() == 'quit':
        print("Ending chat.")
        break

    # Chatbot response
    response = co.chat(message=message,
                        preamble_override=preamble_override,
                        stream=True,
                        conversation_id=conversation_id,
                        return_chat_history=True)

    print("Chatbot: ", end='')

    for event in response:
        if event.event_type == "text-generation":
            print(event.text, end='')

    print(f"\n{'-'*100}\n")


data = response.chat_history
print(json.dumps(data, indent=4))