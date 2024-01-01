from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

# client = OpenAI(api_key='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')
client = OpenAI(api_key='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')

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key

@app.route('/generate_itinerary', methods=['POST', 'OPTIONS'])
def generate_itinerary():
    if request.method == 'OPTIONS':
        # Handle preflight OPTIONS request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

    try:
        # Get the prompt from the request
        data = request.get_json()
        prompts = data['prompts']
        responses = data['responses']

        messages = [
            {"role": "system", "content": "You are a helpful travel assistant."},
        ]     

        for i in range(len(prompts)):
            messages.append({"role": "user", "content": prompts[i]})
            if(i != len(prompts)-1):
                messages.append({"role": "assistant", "content": responses[i]})
        

        # Make a request to the OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        gen_response = response.choices[0].message.content

        return jsonify({'generated_response': gen_response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/assistant', methods=['POST', 'OPTIONS'])
def assistant():
    if request.method == 'OPTIONS':
        # Handle preflight OPTIONS request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

    try:
        # Get the prompt from the request
        data = request.get_json()['messages']
        print(data)

        # Make a request to the OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=data
        )



        gen_response = response.choices[0].message.content

        print(gen_response)

        return jsonify({'generated_response': gen_response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/update_itinerary', methods=['POST', 'OPTIONS'])
def update_itinerary():
    if request.method == 'OPTIONS':
        # Handle preflight OPTIONS request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

    try:
        # Get the user input and existing itinerary from the request
        data = request.get_json()
        initial_prompt = data['prompt']
        user_input = data['user_input']
        existing_itinerary = data['existing_itinerary']

        # Construct a prompt based on the user input and existing itinerary
        prompt = f"This is user feedback: {user_input}. \n Update the travel itinerary based on user feedback. This is the initial prompt: {initial_prompt}. which generated the following itinerary: {existing_itinerary}."

        # Make a request to the OpenAI API
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            max_tokens=1000,
            n=1,
            stop=None
        )

        # Get the generated content from the OpenAI response
        generated_content = response.choices[0].text
        print(generated_content)
        return jsonify({'generated_content': generated_content})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
