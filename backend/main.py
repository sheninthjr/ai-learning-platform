import requests

def search_data(query, api_key, cx):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": api_key,
        "cx": cx,
        "q": query
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

# Example usage
query = "machine learning"
api_key = ""
cx = "YOUR_CUSTOM_SEARCH_ENGINE_ID"
results = search_data(query, api_key, cx)
print(results)