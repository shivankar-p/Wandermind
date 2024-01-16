from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials

from array import array
import os
from PIL import Image
import sys
import time
import requests

# Replace 'your_api_key' and 'your_endpoint' with the actual API key and endpoint
subscription_key = '431f066292ed4921853a08ec127625a3'
endpoint = 'https://reverseimage.cognitiveservices.azure.com/'
computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))
remote_image_url = 'https://lh3.googleusercontent.com/p/AF1QipNiV4wrZqdC-b9zwKpa1CbatRD7WEVoMWWuAhUt=s1360-w1360-h1020'

print("===== Describe an image - remote =====")
# Call API
description_results = computervision_client.describe_image(remote_image_url )

# Get the captions (descriptions) from the response, with confidence level
print("Description of remote image: ")
if (len(description_results.captions) == 0):
    print("No description detected.")
else:
    for caption in description_results.captions:
        print("'{}' with confidence {:.2f}%".format(caption.text, caption.confidence * 100))

detect_domain_results_landmarks = computervision_client.analyze_image_by_domain("landmarks", remote_image_url)
print()
print("Landmarks in the remote image:")
landmarks = []
if len(detect_domain_results_landmarks.result["landmarks"]) == 0:
    print("No landmarks detected.")
else:
    for landmark in detect_domain_results_landmarks.result["landmarks"]:
        landmarks.append(landmark["name"])
        print(landmark["name"]+" : "+str(landmark["confidence"]))

# Function to get the location of a monument using Azure Maps API
def get_location(api_key, endpoint, monument_name):
    maps_url = "https://atlas.microsoft.com/geocode"
    maps_params = {
        "subscription-key": api_key,
        "api-version": "2023-06-01",
        "query": monument_name,
    }
    maps_response = requests.get(maps_url, params=maps_params)

    try:
        # Extract JSON content from the response
        response_json = maps_response.json()

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

            return {
                'locality': locality,
                'country_name': country_name,
                'country_iso': country_iso
            }
        else:
            print("No relevant result found.")

    except Exception as e:
        print(f"Error extracting location: {e}")



if(len(landmarks) > 0): location_info = get_location('Dllk8MbWeVxyMnlbJhgmrn8pnqzflEY0uW9NCNnHNWM', '', landmarks[0])

if location_info:
    print(f"Locality: {location_info['locality']}, Country: {location_info['country_name']} ({location_info['country_iso']})")