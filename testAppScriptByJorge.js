const axios = require("axios");
const URL = "http://localhost:9001/messages";

const axiosPost = (payload, status, testName) => {
  return axios
    .post(URL, payload)
    .then(res => {
      if (res.status === status) {
        console.log(` ${testName} .then: OK.`);
      } else {
        console.log(` ${testName} .then: FAIL. Expected: ${status}`);
      }
    })
    .catch(err => {
      if (status === err.response.status) {
        console.log(` ${testName} .catch: OK. Error:`);
      } else {
        console.log(` ${testName} .catch: FAIL. Expected: ${status}`);
      }
    });
};

//** 1 EMPTY FIELDS **
// 1.1. Testing if the body parameter is empty. Expected status: 400
axiosPost({ destination: "", body: "" }, 400, "Test 1.1.");
// 1.2. Testing if the destination file is empty. Expected status: 400
axiosPost({ destination: "test", body: "" }, 400, "Test 1.2");
// 1.3 Testing if the destination file is empty. Expected status: 400
axiosPost({ destination: "", body: "test" }, 400, "Test 1.3");

//** 2. NO PARAMETERS **
// 2.1 Testing if there are not any parameter. Expected status: 400
axiosPost({}, 400, "Test 2.1.");
// 2.2. Testing if there is not destination parameter. Expected status: 400
axiosPost({ body: "test" }, 400, "Test 2.2.");
// 2.3. Testing if there is no body parameter. Expected status: 400
axiosPost({ destination: "test" }, 400, "Test 2.3.");

//** 3 WRONG PARAMETERS **
// 3.1 Testing if both parameters are wrong. Expected status: 400
axiosPost(
  { wrongParameter: "wrongParameter", wrongParameter2: "test" },
  400,
  "Test 3.1."
);
// 3.2 Testing if destination parameter is wrong. Expected status: 400
axiosPost(
  { wrongParameter: "wrongParameter", body: "test" },
  400,
  "Test 3.2."
);
// 3.3. Testing if body parameter is wrong. Expected status: 400
axiosPost(
  { destination: "test", wrongParameter: "wrongParameter" },
  400,
  "Test 3.3."
);

//** 4 DUPLICATED PARAMETERS **
//4.1. Testing if body parameter is duplicated. Expected status: 400
axiosPost({ destination: "test", body: "test", body: "test2" }, 400, "Test 4.1.");
//4.2. Testing if destination parameter is duplicated. Expected status: 400
axiosPost({ destination: "test", destination: "test", body: "test" }, 400, "Test 4.2.");

//** 5. TOO BIG FIELD **
//5.1. testing if the extension of the destination field is big. Expected status: 400
axiosPost(
  {
    destination:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit ultricies urna platea morbi mus fames, cursus arcu parturient magnis curabitur. Eu cursus arcu accumsan eleifend ultrices rhoncus erat dis feugiat dapibus, mattis fusce eros et ornare proin commodo suspendisse nibh ut, consequat mauris nullam semper vivamus sociis conubia lobortis elementum. Cubilia maecenas mauris hac ac porta pretium, nibh ullamcorper tortor hendrerit diam blandit morbi, ultricies metus vitae id tellus.Himenaeos scelerisque venenatis nisi interdum pharetra rhoncus duis magna cras id neque faucibus molestie nunc, et in diam mi egestas taciti gravida senectus potenti ornare erat massa nibh. Rhoncus lacus fames convallis eget maecenas aptent tellus ad elementum cubilia vivamus mus magnis sodales, nostra sed donec tristique quisque fusce pulvinar a mattis magna vulputate nam. Blandit libero quis ac cras dapibus suscipit venenatis consequat placerat, fames dignissim potenti donec diam augue etiam quisque vehicula, varius eleifend interdum fermentum mattis magna enim vestibulum.",
    body: "test"
  },
  400,
  "Test 5.1."
);

//5.2. testing if the extension of the body is too big.  Expected status: 400
axiosPost(
  {
    destination: "test",
    body:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit ultricies urna platea morbi mus fames, cursus arcu parturient magnis curabitur. Eu cursus arcu accumsan eleifend ultrices rhoncus erat dis feugiat dapibus, mattis fusce eros et ornare proin commodo suspendisse nibh ut, consequat mauris nullam semper vivamus sociis conubia lobortis elementum. Cubilia maecenas mauris hac ac porta pretium, nibh ullamcorper tortor hendrerit diam blandit morbi, ultricies metus vitae id tellus.Himenaeos scelerisque venenatis nisi interdum pharetra rhoncus duis magna cras id neque faucibus molestie nunc, et in diam mi egestas taciti gravida senectus potenti ornare erat massa nibh. Rhoncus lacus fames convallis eget maecenas aptent tellus ad elementum cubilia vivamus mus magnis sodales, nostra sed donec tristique quisque fusce pulvinar a mattis magna vulputate nam. Blandit libero quis ac cras dapibus suscipit venenatis consequat placerat, fames dignissim potenti donec diam augue etiam quisque vehicula, varius eleifend interdum fermentum mattis magna enim vestibulum."
  },
  400,
  "Test 5.2."
);

//** 6. REQUEST TIME **
//6.1. testing if the request waiting time exceeds 4s. Expected status: 504
const payload = {
  destination: "test",
  body: "test"
};

axios
  .post(URL, payload)
  .then(
    res =>
      setTimeout(() => {
        if (res.status === 200) {
          console.log("Test 6 .then: OK. ");
        }
        console.log("Test 6 .then. Expected: 504");
      }),
    4000,
    "Test 6.1."
  )
  .catch(e => {
    if (e.response.status === 500 || e.response.status === 504) {
      console.log("Test 6. catch: OK");
    } else {
      console.log("Test 6. catch: FAIL. Expected: 500 or 504");
    }
  });

//** 7. TYPE STRING **
//7.1. Testing if the fields are not a Number
axiosPost({ destination: 4, body: 10 }, 400, "Test 7.1.");
//7.2. Testing if the body field is not a Number
axiosPost({ destination: "test", body: 10 }, 400, "Test 7.2.");
//7.3. Testing if the destination field are not a Number
axiosPost({ destination: 4, body: "test" }, 400, "Test 7.3.");