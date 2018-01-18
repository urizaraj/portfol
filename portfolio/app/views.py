from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
    context = {
        'title': 'portfolio',
        'script': 'app/index.js',
        'style': 'css/index.css',
        }
    return render(request, 'app/index2.haml', context)

def tictac(request):
    context = {
        'title': 'tic tac toe',
        'script': 'app/tictac.js',
        'style': 'css/tictac.css',
        }
    return render(request, 'app/tictac.haml', context)

def simon(request):
    context = {
        'title': 'simon',
        'script': 'app/simon.js',
        'style': 'css/tictac.css',
        }
    return render(request, 'app/simon.haml', context)

def quote(request):
    context = {
        'title': 'random quote',
        'script': 'app/quote.js',
        'style': 'css/quote.css',
        }
    return render(request, 'app/quote.haml', context)

def timer(request):
    context = {
        'title': 'timer',
        'script': 'app/timer.js',
        'style': 'css/tictac.css',
        }
    return render(request, 'app/timer.haml', context)