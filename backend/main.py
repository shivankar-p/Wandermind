from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
import requests
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
print(openai_api_key)

# client = OpenAI(api_key='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')
client = OpenAI(api_key=openai_api_key)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

subscription_key = '431f066292ed4921853a08ec127625a3'
endpoint = 'https://reverseimage.cognitiveservices.azure.com/'
computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))


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

        print(prompts)
        print(responses)

        # print(len(prompts))
        # print(len(responses))

        messages = [
            {"role": "system", "content": "You are a helpful travel assistant."},
        ]     

        for i in range(len(prompts)):
            messages.append({"role": "user", "content": prompts[i]})
            if(i != len(prompts)-1):
                messages.append({"role": "assistant", "content": responses[i]})
        
        # print(messages)

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

    # try:
    #     # Get the prompt from the request
    #     data = request.get_json()['messages']
    #     # print(data)

    #     # Make a request to the OpenAI API
    #     response = client.chat.completions.create(
    #         model="gpt-3.5-turbo",
    #         messages=data
    #     )



    #     gen_response = response.choices[0].message.content

    #     print(gen_response)

    #     return jsonify({'generated_response': gen_response})

    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    hotelsDescription = "- **Northfields Hostel** - Price: $542.55 USD\n\n- **The Captain Cook Hotel** - Price: $620.58 USD\n\n- **Morgan Hotel** - Price: $668.37 USD\n\n- **Lyall Apartment Hotel** - Price: $676.08 USD\n\n- **SACO St Pauls - Red Lion Court** - Price: $1174.03 USD\n"

    return jsonify({'generated_response': hotelsDescription})
    
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
    
@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload():
    if request.method == 'OPTIONS':
        # Handle preflight OPTIONS request
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

    # print(request.get_json())
    # url = request.get_json()['url']

    # if url:
    #     landmark_name = get_landmark(url)

    #     if landmark_name:
    #         location = get_location(landmark_name)
    #         return jsonify({'locality': location})

    # return jsonify({'error': 'Invalid request'})
    return jsonify({'locality': 'Hawaii'})

def get_landmark(url):

    detect_domain_results_landmarks = computervision_client.analyze_image_by_domain("landmarks", url)
    # print(detect_domain_results_landmarks)
    # Extract locality information from the response
    landmarks = detect_domain_results_landmarks.result["landmarks"]
    if len(landmarks) > 0:
        print(landmarks[0]["name"])
        return landmarks[0]["name"]
    
def get_location(landmark):
    maps_url = "https://atlas.microsoft.com/geocode"
    maps_params = {
        "subscription-key": 'Dllk8MbWeVxyMnlbJhgmrn8pnqzflEY0uW9NCNnHNWM',
        "api-version": "2023-06-01",
        "query": landmark,
    }
    maps_response = requests.get(maps_url, params=maps_params)

    try:
        # Extract JSON content from the response
        response_json = maps_response.json()

        print(response_json)

        # Get the most relevant tourist structure result, if available
        tourist_structure_results = [feature for feature in response_json.get('features', [])
                                      if feature.get('properties', {}).get('type') == 'TouristStructure']

        if tourist_structure_results:
            relevant_result = max(tourist_structure_results, key=lambda x: x.get('properties', {}).get('score', 0))
        else:
            # If no tourist structure results, fall back to the most relevant result of any type
            relevant_result = max(response_json.get('features', []), key=lambda x: x.get('properties', {}).get('score', 0))

        if relevant_result:
            properties = relevant_result.get('properties', {})
            address = properties.get('address', {})
            locality = address.get('locality', 'Locality not found')
            country_region = address.get('countryRegion', {})

            country_name = country_region.get('name', 'Country not found')
            country_iso = country_region.get('ISO', 'ISO not found')

            # return {
            #     'locality': locality,
            #     'country_name': country_name,
            #     'country_iso': country_iso
            # }
            return locality+", "+country_name
        else:
            print("No relevant result found.")

    except Exception as e:
        print(f"Error extracting location: {e}")


if __name__ == '__main__':
    app.run(debug=True)
