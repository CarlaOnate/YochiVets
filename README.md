# VetsforPets
## What is it?
This project is called vetsForPets and its main goal is to be a platform where vets can make home appointments and earn some extra money. This project was done for third module at Ironhack bootcamp. 

## Main funcitons
This app has only the clients views for the moment
- Home: This is the landing page where you can be redirected to create your account or to signup as a vet in the platform
![Landing page image](https://res.cloudinary.com/dxxdamndt/image/upload/v1583877591/Screen_Shot_2020-03-10_at_3.59.37_PM_bbfpdm.png)
- FindVets: In this page you can find the vets signed up in the platform and you can filter them by specialty, usign the radio button on top. Because of some bugs you need to choose the specialty and then click on ShowAll to do another search, if you search two times in a row without showing all vets it will not find anything.
![Landing page image](https://res.cloudinary.com/dxxdamndt/image/upload/v1583878099/Screen_Shot_2020-03-10_at_4.04.14_PM_lmjtkk.png)
- MakeAppointment: This has a simple form to create the appointment with the selected vet, in here you have to click all the fields in order to make the form otherwise it will not create the appointment.
![Landing page image](https://res.cloudinary.com/dxxdamndt/image/upload/v1583878204/Screen_Shot_2020-03-10_at_4.09.52_PM_maa7pj.png)
- Profile: This is the main part of the app, here is where the client can create, edit or delete pets, appointment and its profile information. In here is where you can see all the current appointment created and all the pets that you have.
![Landing page image](https://res.cloudinary.com/dxxdamndt/image/upload/v1583878640/Screen_Shot_2020-03-10_at_4.17.04_PM_gml1os.png) 
 
## Deployed site
If you want to create your pets and make fake appointments for your pets feel free to do so. Here is the link to the deployed site.

https://vetsforpets.netlify.com/

## How to run it locally?
To test this on your computer simply clone the project and in the backend run npm run dev and in the frontend run npm start.
This website has Atlas as a DB and uses heroky to store the backend API. To be fully functional you should and your .env with all the variables for the DB, cloudinary, frontEndpoint, and the baseURL for axios in the services folder inside fronted.
