from django.forms import ModelForm
from .models import ContactUsQuery


class ContactUsQueryForm(ModelForm):
    class Meta:
        model = ContactUsQuery
        fields = '__all__'
