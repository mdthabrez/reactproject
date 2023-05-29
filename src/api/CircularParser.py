import sys
import pytesseract
from pdf2image import convert_from_path
import re
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
from datetime import datetime
from spacy.matcher import Matcher
import json
import spacy

# Load the English language model in spaCy
nlp = spacy.load('en_core_web_sm')

def convert_to_date_format(date_list):
    day = date_list[3].replace('th', '')
    month = date_list[4]
    year = date_list[5]
    
    months = {
        'January': '01',
        'February': '02',
        'March': '03',
        'April': '04',
        'May': '05',
        'June': '06',
        'July': '07',
        'August': '08',
        'September': '09',
        'October': '10',
        'November': '11',
        'December': '12'
    }
    
    formatted_date = f"{day}-{months[month]}-{year}"
    return formatted_date

def extract_events_and_dates(text):
    events_dates = []
    doc = nlp(text)
    matcher = Matcher(nlp.vocab)
    matcher.add("DATE", [[{"ENT_TYPE": "DATE"}]])
    
    for line in text.split('\n'):
        line = line.strip()
        events = []
        dates = []
        line_doc = nlp(line)
        
        matches = matcher(line_doc)
        for match_id, start, end in matches:
            dates.append(line_doc[start:end].text)
            
        for chunk in line_doc.noun_chunks:
            if 'EVENT' in chunk.root.ent_type_:
                events.append(chunk.text)
                
        if events and dates:
            events_dates.append((events, dates))
            
    return events_dates

# Retrieve the PDF path from the command line arguments
pdf_path = sys.argv[1]


pages = convert_from_path(pdf_path, dpi=300)



# Iterate over each page and read the text using pytesseract
text = ''
for page in pages:
    text += pytesseract.image_to_string(page)

events_dates_list = extract_events_and_dates(text)

event = ''
deadline = ''

for events_dates in events_dates_list:
    events, dates = events_dates
    event = events[0]
    deadline = convert_to_date_format(dates)
    
    

recipient = ''
date = ''
date_pattern = r'\b(\d{2})\-(\d{2})\-(\d{4})\b'
date_pattern1 = r'\b(\d{2})\/(\d{2})\/(\d{4})\b'
date_pattern2 = r'\b(\d{2})\.(\d{2})\.(\d{4})\b'
subject = ''

ref = ''

sender = ''

text = text.split('\n')
for i in range(len(text)):
    if recipient == '':
        if text[i] == 'To,' or text[i] == 'To' or text[i] == 'To:':
            j = i+1
            while text[j] == '':
                j+=1
            recipient = text[j][:-1]
        elif text[i].find('To,') != -1 or text[i].find('To:') != -1:
            recipient += text[i][3:]
            j = i+1
            while text[j] == '':
                j+=1
            recipient = text[j][:-1]
    if sender == '':
        if text[i] == 'From,' or text[i] == 'From' or text[i] == 'From:':
            j = i+1
            while text[j] == '':
                j+=1
            sender = text[j][:-1]
        elif text[i].find('From,') != -1 or text[i].find('From:') != -1:
            sender += text[i][5:]
            j = i+1
            while text[j] == '':
                j+=1
            sender = text[j][:-1]
    if date == '':
        match = re.findall(date_pattern, text[i])
        if match:
            date = match[0][0] + '-' + match[0][1] + '-' + match[0][2]
        else:
            match = re.findall(date_pattern1, text[i])
            if match:
                date = match[0][0] + '-' + match[0][1] + '-' + match[0][2]
            else:
                match = re.findall(date_pattern2, text[i])
                if match:
                    date = match[0][0] + '-' + match[0][1] + '-' + match[0][2]
                else:
                    if date == '' and 'Date' in text[i] or 'Dated' in text[i]:
                        date = text[i][text[i].find('Date')+6:]
    if subject == '':
        if text[i].find('Subject:') != -1:
            subject += text[i][8:]
            j = i+1
            while text[j] != '':
                subject += text[j]
                j+=1
        if text[i].find('Sub:') != -1:
            subject += text[i][5:]
            j = i+1
            while text[j] != '':
                subject += text[j]
                j+=1
    if ref == '' and 'Clr.No.' in text[i] or 'Clr.No:' in text[i] or 'Clr_No.' in text[i] or 'Clr_No:' in text[i] or 'Lr. No.' in text[i] or 'Lr. No:' in text[i] or 'Lr._No.' in text[i] or 'Lr._No:' in text[i] or 'Ref.No.' in text[i] or 'Ref.No:' in text[i] or 'Ref_No.' in text[i] or 'Ref_No:' in text[i]:
        j = 7
        while j < len(text[i]) and text[i][j] == ' ':
            j += 1
        while j < len(text[i]) and text[i][j] != ' ':
            ref += text[i][j]
            j += 1
    if ref == '' and 'Procs.No.' in text[i] or 'Procs.No:' in text[i]:
        j = 9
        while j < len(text[i]) and text[i][j] == ' ':
            j += 1
        while j < len(text[i]) and text[i][j] != ' ':
            ref += text[i][j]
            j += 1
    if ref == '' and 'Letter No.' in text[i] or 'Letter_No.' in text[i] or 'Letter No:' in text[i] or 'Letter_No:' in text[i]:
        j = 10
        while j < len(text[i]) and text[i][j] == ' ':
            j += 1
        while j < len(text[i]) and text[i][j] != ' ':
            ref += text[i][j]
            j += 1
    if ref == '' and 'Lr No:' in text[i] or 'Lr_No:' in text[i] or 'Lr No.' in text[i] or 'Lr_No.' in text[i]:
        j = 6
        while j < len(text[i]) and text[i][j] == ' ':
            j += 1
        while j < len(text[i]) and text[i][j] != ' ':
            ref += text[i][j]
            j += 1
    if ref == '' and 'F.No.' in text[i] or 'F.No:' in text[i]:
        j = 5
        while j < len(text[i]) and text[i][j] == ' ':
            j += 1
        while j < len(text[i]) and text[i][j] != ' ':
            ref += text[i][j]
            j += 1
    if recipient != '' and date != '' and subject != '' and ref != '':
        break



if sender == '':
    sender = 'Dr. Sridhar\nProfessor & Head'
    


data = {
    'Text': '\n'.join(text),
    'Sender': sender,
    'Recipient': recipient,
    'Date': date,
    'Subject': subject,
    'Ref No': ref,
    'Event': event, 
    'Deadline': deadline,
}

json_data = json.dumps(data)

print(json_data)