import requests
import json
import numpy as np
import cv2
import face_recognition
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pytz import timezone 
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path
import os
dotenv_path = Path('./.env')

load_dotenv(dotenv_path=dotenv_path)
ind_time = datetime.now(timezone("Asia/Kolkata")).strftime('%H:%M.%f')
print("Time -----> ",ind_time)

subj=''
if(ind_time[0:2]=="10"):
    subj='science'
    subjDoc = "sample_doc"
else:
    subj='Math'
    subjDoc = "Sample_doc_id2"

print("present class ---------> ",subj)
url=os.getenv("API_KEY")
url +="/get-encodings"
payload={}
headers={
    'content-type' : 'multipart/form-data'
}
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

cred = credentials.Certificate('firebase_1.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
studentDict={}
coll = db.collection("students").stream()
# print(coll)
for doc in coll:
    print(f'{doc.id} => {doc.to_dict()}')
    d=doc.to_dict()
    studentDict[d["name"]] = d["id"]
# print(studentDict)
indexDict={}
for a,b in studentDict.items():
    indexDict[a]=0
response = requests.request("GET", url , headers=headers, data=payload)
# print(type(response.text))
req = json.loads(response.text)
# print(req)
classNames=req["faces"]
# print(type(req["encodings"]))
encodeListKnown = json.loads(req["encodings"])
for i in range(len(encodeListKnown)):
    encodeListKnown[i]=np.array(encodeListKnown[i])
# print(type(encodeListKnown[0]))
print("start")
fast=10
cap=cv2.VideoCapture(0,cv2.CAP_DSHOW)
process_this_frame=fast
while True:
    # Grab a single frame of video
    ret, frame = cap.read()
    if process_this_frame == fast:
        process_this_frame=0
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=1, fy=1)
        rgb_small_frame = small_frame[:, :, ::-1]
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(encodeListKnown, face_encoding)
            name = "Unknown"
            face_distances = face_recognition.face_distance(encodeListKnown, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = classNames[best_match_index]

            face_names.append(name)
    process_this_frame+=1
    ind_time="now"
    print(face_locations,face_names)
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        # top *= 2
        # right *= 2
        # bottom *= 2
        # left *= 2
    
        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 10), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom -2), font, 0.3, (255, 255, 255), 1)


        if(name=="Unknown" or process_this_frame!=fast): continue
        attList = db.collection("attendance").document(subjDoc).get().to_dict()["students"]
        att = attList[str(studentDict[name])]
        # print(attList)
        # print(att[str(studentDict[name])])
        ind = indexDict[name]%5
        indexDict[name]+=1
        new_att = att[:ind] + '1' + att[ind+1:]
        attList[str(studentDict[name])] = new_att
        res=db.collection("attendance").document(subjDoc).update({
            "students" : attList
        })

    cv2.imshow('Video', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break