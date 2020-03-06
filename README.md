## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Install Python dependencies `yarn install-requirements` or `npm install-requirements`
2. Start development server `yarn start` or `npm start`.

## Next Steps


### Sample Data

Replace the sample data stored in /server/sampleData.py.
Replace the default images stored in /src/images.



### Adding a New Page

1. Create a folder in `/src/components` with your react components.
2. Add a route for your page to `/src/App.js`.
3. Add a button to the navigation bar in `/src/components/NavBar/index.js`.


## File Structure

The front-end is based on [create-react-app](https://github.com/facebook/create-react-app).

The back-end is based on [Flask](https://github.com/pallets/flask).

The front-end is served on http://localhost:8080/ and the back-end on http://localhost:3000/.

```
.
├── src - React front-end
│ ├── components - React components for each page
│ ├── App.jsx - React routing
│ └── index.jsx - React root component
├── server/ - Flask server that provides API routes and serves front-end
│ ├── constants.py - Defines the constants for the endpoints and port
│ ├── sampleData.py - Contains all sample text data for generate pages
│ └── server.py - Configures Port and HTTP Server and provides API routes
└── README.md
```

## Additional Documentation


- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/

- Bootstrap CSS - https://getbootstrap.com/
- Flask - http://flask.pocoo.org/


  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).