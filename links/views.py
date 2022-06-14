import json
import urllib
from django.http import HttpResponse
from django.template import loader

from django.http import JsonResponse
import feedparser
from django.shortcuts import render

# Create your views here.
def main(request):
    name = 'Main Page'
    temp = loader.get_template('table_links.html')
    context = {
        'name': name,
        'link1': './',
        'link2': './pricesFilter'
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

def pricesFilter(request):
    name = 'Price Filter'
    temp = loader.get_template('rangePrices.html')
    context = {
        'name': name,
        'link1': '../',
        'link2': './',
    }
    return HttpResponse(temp.render(context, request))