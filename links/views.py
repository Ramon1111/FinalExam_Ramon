import json
import urllib
from django.http import HttpResponse
from django.template import loader

from django.http import JsonResponse
import feedparser
from django.shortcuts import render

# Create your views here.
def main(request):
    name = 'Rifadoooo'
    temp = loader.get_template('table_links.html')
    context = {
        'name': name,
    }
    return HttpResponse(temp.render(context, request))

def checkTables(request):

    url = "https://api.itbook.store/1.0/search/information"
    response = urllib.request.urlopen(url)
    data = json.loads(response.read())
    print(data)


    context = {
        'info': data,
        'dato':request['wts']
    }

    return JsonResponse(context, status=200)
