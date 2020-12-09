from django.shortcuts import render
from .models import ContactUsQuery
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core.mail import send_mail


def new_admin(request):
    return render(request, 'build/index.html')


@csrf_exempt
def ContactFormView(request):
    obj = ContactUsQuery.objects.create(
        f_name=request.POST.get('fnane'),
        email=request.POST.get('email'),
        message=request.POST.get('message'),
    )
    obj.save()
    message = request.POST.get('message') + ' by ' + request.POST.get('email') + ' Name: ' + request.POST.get('fnane')
    try:
        a = send_mail(
            'Someone Asked a Question though Contact Us',
            message,
            '04dda7661b-7a4b89@inbox.mailtrap.io',
            ['trustworthy.humor@gmail.com', 'rkswcud2.ads@gmail.com'],
            fail_silently=False,
        )
        print(a)
    except Exception as e:
        print(e)

    html = "<center><div class=\"container\"><h1>Thanks for Contacting us<br>Return to <a " \
           "href=\"/\">Home</a></h1></div></center> "
    return HttpResponse(html)
