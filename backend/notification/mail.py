import os
import boto3
from botocore.exceptions import ClientError

def send_mail(recipient,
              mail_content,
              sender="test <test@coronatestinfo.de>", 
              subject="Corona Test Mail"):
    
    
    aws_id = os.environ["AWS_ID"]
    aws_key = os.environ["AWS_KEY"]
    charset = "UTF-8"
    aws_region = "eu-west-1"

    if aws_id == "" or aws_key == "":
        return False, "could not load creds"

    body_text = ("{}\r\n{}".format(subject, mail_content))
    body_html = """<html>
    <head></head>
    <body>
    <h1>{}</h1>
    <p>{}</p>
    </body>
    </html>
    """.format(subject, mail_content)

    client = boto3.client('ses',
                          region_name=aws_region,
                          aws_access_key_id=aws_id,
                          aws_secret_access_key=aws_key)

    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    recipient,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': charset,
                        'Data': body_html,
                    },
                    'Text': {
                        'Charset': charset,
                        'Data': body_text,
                    },
                },
                'Subject': {
                    'Charset': charset,
                    'Data': subject,
                },
            },
            Source=sender,
        )
    # Display an error if something goes wrong.
    except ClientError as e:
        return False, e.response['Error']['Message']
    else:
        return True, "success -- {}".format(response['MessageId'])