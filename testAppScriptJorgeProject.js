const axios = require("axios");
const URL = `http://localhost:9001/messages`;


const testApp = payload =>{
return axios.post(URL, payload)
.then(res =>console.log(res.status, res.data))
.catch(err => console.log(err.response.status, err.response.data));
}

//Send incorrect fields. Expected Error: 400 Bad Request
testApp({body: "body", fieldTest: "test"});
//-------------------------------------------------------------------
//Send fields duplicated. Expected Error: 400 Bad Request
testApp({destination: "name", body: "body", body: "body"});
//-------------------------------------------------------------------
//Send both empty fields. Expected Error: 400 Bad Request
testApp({destination: "", body: ""});
//Send empty key. Expected Error: 400 Bad Request
testApp({"": "name", body: "body"});
//Send empty value. Expected Error: 400 Bad Request
testApp({destination: "name", body: ""});
//Send empty payload
testApp({});
//Send integer instead of String. Expected Error: 400 Bad Request
testApp({ destination: 12, body: 3});
//-------------------------------------------------------------------
//Send less parameters than expected. Expected Error: 400 Bad Request
testApp({ body: "body"});
//-------------------------------------------------------------------
//Send a long payload Expected Error: 504 Gateway Timeout
testApp({ destination: "pepeLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac purus vitae ante molestie bibendum id id eros. Proin vehicula justo et venenatis elementum. Donec porta fringilla sapien, non laoreet est ullamcorper eu. Integer ultrices enim in purus porta tristique. Nulla sodales ornare ullamcorper. Integer ac ipsum nec tortor finibus mattis. Praesent commodo mattis suscipit. Suspendisse sit amet hendrerit purus. Aliquam finibus, sapien nec mollis tempor, nunc ipsum aliquet est, vel luctus eros elit ut sem.Sed ultrices sagittis eros. Pellentesque et placerat odio, egestas aliquet elit. Curabitur vel maximus eros. Ut luctus ornare sapien ut mollis. Mauris placerat dapibus auctor. Nulla sem lectus, lobortis sit amet iaculis quis, blandit eu leo.",

body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non iaculis leo. Integer nec semper ligula. Nam vel auctor erat. Praesent lobortis risus sapien, sit amet euismod lorem tempus id. Aenean sed blandit lorem. Ut at leo laoreet, pharetra nisl in, tincidunt tellus. In hac habitasse platea dictumst. Pellentesque ut mattis ipsum. Donec pharetra eget ipsum eu pellentesque. Cras eget lobortis velit. Quisque venenatis pretium odio, fringilla egestas sapien pellentesque sed.Fusce nec pulvinar velit. Phasellus vitae volutpat dolor. Pellentesque porta consectetur dictum. Nunc nunc quam, commodo ut mauris eu, scelerisque interdum justo. Phasellus sed gravida mi. Maecenas quis ex massa. Nullam faucibus ultricies nulla, ac imperdiet est feugiat non. Suspendisse a efficitur urna, non sollicitudin lorem. Nulla metus nibh, ornare sit amet aliquet in, sollicitudin a quam. Praesent est nisl, ultricies tempor imperdiet a, rhoncus eget dui.Vestibulum est nunc, faucibus eget orci sit amet, aliquet pulvinar ligula. Cras mollis magna sapien, id vulputate arcu ornare quis. Aliquam a dui et lorem tincidunt auctor. Pellentesque pharetra vulputate erat, ut dictum dui faucibus id. Phasellus aliquet leo nunc, vitae convallis orci lacinia pretium. Maecenas id tellus et nibh tincidunt convallis eu at mi. Mauris vel auctor dolor, id accumsan lacus. Mauris mauris dolor, efficitur ut orci id, porttitor ultricies justo. Pellentesque vehicula tortor et elit placerat, ut ullamcorper purus facilisis. Cras eleifend sem ipsum. Proin consequat vel odio in finibus. Ut ut ligula tincidunt, molestie dolor nec, tristique mauris. "});
//-------------------------------------------------------------------
//Exceeded time to response. Expected Error: 504 Gateway Timeout
const payload={
    destination:"name",
    body:"body"
}
axios.post(URL,payload)
.then(res=>setTimeout(()=>console.log(res.status, res.data)),5000)
.catch(err => console.log(err.response.status, err.response.data));





//Envío un campo de más
// axios
//   .post(URL, {  body: "body", fieldTest: "test" })
//   .then(res =>console.log(res.status))
//   .catch(err => console.log(err.response.status, err.response.data));

// //Envío Strings vacíos
// axios
//   .post(URL, { destination: "", body: "" })
//   .catch(err => res.status(500).json({ message: err }));

// //Envío key y value vacío
// axios
//   .post(URL, { destination: "name", body: "" })
//   .catch(err => res.status(500).json({ message: err }));

// //Envío key incorrecta. Especificar los errores
// axios
//   .post(URL, { fieldChanged: "name", body: "" })
//   .catch(err => res.status(500).json({ message: err }));


