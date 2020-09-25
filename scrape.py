import requests
from bs4 import BeautifulSoup

url = 'https://en.wikipedia.org/wiki/Apache_Kafka'

page = requests.post(url)
soup = BeautifulSoup(page.text, 'html.parser')
body = soup.find(class_=("mw-content-ltr"))
print(body)

