import requests
from bs4 import BeautifulSoup

url = "https://play.pokemonshowdown.com/sprites/trainers/"

# Send a GET request to the URL
response = requests.get(url)

# Create a BeautifulSoup object with the response content
soup = BeautifulSoup(response.content, 'html.parser')

# Find all <figcaption> tags and extract the trainer names
trainer_names = [figcaption.text for figcaption in soup.find_all('figcaption')]

# Write the trainer names to a trainers.txt file
with open('trainers.txt', 'w') as file:
    for name in trainer_names:
        file.write(name + '\n')

print("Trainer names written to trainers.txt file.")
