from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .forms import ContactForm
from django.core.mail import send_mail

def index(request):
    form = ContactForm()
    
    context = {
        'title': 'Alexander Urizar - Portfolio',
        'script': 'app/js/index.js',
        'style': 'app/css/index.css',
        'form': form
        }
    
    return render(request, 'app/index2.haml', context)

def tictac(request):
    context = {
        'title': 'tic tac toe',
        'script': 'app/js/tictac.js',
        'style': 'app/css/tictac.css',
        }
    return render(request, 'app/tictac.haml', context)

def simon(request):
    context = {
        'title': 'simon',
        'script': 'app/js/simon2.js',
        'style': 'app/css/tictac.css',
        }
    return render(request, 'app/simon.haml', context)

def quote(request):
    context = {
        'title': 'random quote',
        'script': 'app/js/quote.js',
        'style': 'app/css/quote.css',
        }
    return render(request, 'app/quote.haml', context)

def timer(request):
    context = {
        'title': 'timer',
        'script': 'app/js/timer.js',
        'style': 'app/css/tictac.css',
        }
    return render(request, 'app/timer.haml', context)

def memory(request):
    context = {
        'title': 'memory',
        'script': 'app/js/memory.js',
        'style': 'app/css/memory.css'
    }
    return render(request, 'app/memory.haml', context)