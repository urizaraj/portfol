from django import forms

class ContactForm(forms.Form):
    subject = forms.CharField(label='Subject', max_length=100)
    subject.widget.attrs['class'] = 'form-control'
    
    message = forms.CharField(widget=forms.Textarea)
    message.widget.attrs['class'] = 'form-control'
    
    sender = forms.EmailField()
    sender.widget.attrs['class'] = 'form-control'
    
    cc_myself = forms.BooleanField(required=False)
    cc_myself.widget.attrs['class'] = 'form-check-input'