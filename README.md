# About
Study Buddy is an app to help you study more productively. It provides all the tools you may need while studying at one place to give you hassle free learning experience.

# Tech stack 
React + Vite and Tailwind CSS

# UserFlow 
- set timer for session and breaks
- set music for the session
- study 


# developer notes
at first the welcome page is loaded.
welcome page will ask for name and daily goal for studying for the first time visitors. 
then the user can click on 'make a session' button.
this will take him to the session-setup page. 
Session-setup page has three components : setTimer, setBreaks, setMusic.
setTimer will determine the sessionDuration initial state.
setBreaks will determine the sessionInterval array
setMusic will update the musicArray.

after setting all three components the user clicks next, this takes him to the session page.
Session is started now. The user will be notified when there are breaks and when the session ends. 

This all was the main user flow. 

Apart from this will be reports and help page. 
Help page will have a contact form for giving feedback or query etc.. It will also have about section in which the use of the study buddy app will be there and its github link will be there. 

The reports page will show the stats of the user. Like the current streak, highest streak, today's total study duration, etc. 
All the stats will be calculated in the backend and returned to the frontend in the json format. 

This github repo only has the frontend of the web application and not backend. 

The /session-setup and /session pages will send following info to the backend:
- sessionStartedTimeStamp
- sessionEndedTimeStamp
- sessionInterval
- sessionDuration
- sessionIndex

Streak will be determined on the basis of the study goal entered in the welcome page by the user. For example if the user sets the goal to be 4 hours, then 
the streak will only be updated when the user study 4+= hrs during a day. The goal will be customizable later as well.

All the Pages are here:
- "/" => welcome page  
- "/session-setup" => set session details like music, timer, breaks
- "/session" => session started and session ended page
- "/reports" => see study stats
- "/help" => contact us & know more


