import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000/",
});

const authLogin = async (username, password) => {
  try {
    const result = await api.post("api-token-auth/", {
      username,
      password,
    });
    if (result.data.token) {
      return result.data.token;
    }
  } catch (err) {
    return err;
  }
};

export const getUserDetails = async (username) => {
  try {
    const result = await api.get(`get-user-details/?name=${username}`);
    return result.data;
  } catch (err) {
    return err;
  }
};

export default authLogin;

/* import axios from "axios";
const productEndpoint = axios.create({
  baseURL: "http://localhost:8000/product/",
});

export const getAllProducts = async () => {
  try {
    const allProducts = await productEndpoint.get();
    return allProducts.data;
  } catch (err) {
    return err;
  }
};

export const getFixedProducts = async () => {
  return JSON.parse("[{\"id\":4,\"uuid\":\"aa244e7e-c03d-48b8-a9cc-76bbfd35436f\",\"name\":\"test3\",\"SKU\":\"12312312saq\",\"UPC\":\"950754175968\",\"EAN\":\"300\",\"MPN\":\"486005923585\",\"ISBN\":\"300\",\"available_units\":1,\"minimum_units\":1,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":9,\"uuid\":\"0dbc1003-97e1-457d-a8c7-07a6f59cfdb4\",\"name\":\"testrcqqcrqe23\",\"SKU\":\"1234cqfcasd\",\"UPC\":\"424743196386\",\"EAN\":\"5449903390347\",\"MPN\":\"433249233008\",\"ISBN\":\"\",\"available_units\":300,\"minimum_units\":1,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":19,\"uuid\":\"25ba6ada-c538-4ec2-a133-dbd0372456d5\",\"name\":\"23xdasd\",\"SKU\":\"23123\",\"UPC\":\"128325330028\",\"EAN\":\"3011102901863\",\"MPN\":\"887274385558\",\"ISBN\":\"\",\"available_units\":123123,\"minimum_units\":1232,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":8,\"uuid\":\"7d7784bb-0c6d-4e5b-90ae-e17fc63ede3d\",\"name\":\"test23\",\"SKU\":\"23213\",\"UPC\":\"577430046059\",\"EAN\":\"9773661062949\",\"MPN\":\"592150522167\",\"ISBN\":\"\",\"available_units\":800,\"minimum_units\":400,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":2,\"uuid\":\"449fab02-5a76-4b55-9dbe-fb8bfb02a34c\",\"name\":\"Test2123123\",\"SKU\":\"286380382111\",\"UPC\":\"952774734319\",\"EAN\":\"2324040031103\",\"MPN\":\"269411958091\",\"ISBN\":\"\",\"available_units\":10,\"minimum_units\":23,\"manufacturer\":\"test\",\"brand\":\"test\",\"dimensions\":\"20x10x100\",\"image\":null,\"weight\":2.43},{\"id\":18,\"uuid\":\"e70d67dc-6bc8-4bd5-9b69-f67d33e64e48\",\"name\":\"ASdasF as\",\"SKU\":\"3fdsafasdf\",\"UPC\":\"980829171476\",\"EAN\":\"4187721959162\",\"MPN\":\"307919948262\",\"ISBN\":\"\",\"available_units\":1221,\"minimum_units\":2121,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":3,\"uuid\":\"ed28e88c-556d-4c8d-8d1e-ae790417ef08\",\"name\":\"test2\",\"SKU\":\"716576123699\",\"UPC\":\"459780374644\",\"EAN\":\"7403573649840\",\"MPN\":\"261870309458\",\"ISBN\":\"\",\"available_units\":1,\"minimum_units\":1,\"manufacturer\":\"af\",\"brand\":\"asdf\",\"dimensions\":\"sadf\",\"image\":null,\"weight\":4},{\"id\":7,\"uuid\":\"ffce974d-3f61-4c68-bf16-b9055e2fe5a2\",\"name\":\"test6\",\"SKU\":\"asasd123123\",\"UPC\":\"520478477808\",\"EAN\":\"5792855622322\",\"MPN\":\"375064307145\",\"ISBN\":\"\",\"available_units\":1,\"minimum_units\":1,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":6,\"uuid\":\"c6452431-343a-4b7f-8abe-06c2765e5d2f\",\"name\":\"test5\",\"SKU\":\"asda12d3x\",\"UPC\":\"742416719799\",\"EAN\":\"2868980014355\",\"MPN\":\"309167588660\",\"ISBN\":\"\",\"available_units\":1,\"minimum_units\":1,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":17,\"uuid\":\"4d553d1a-b3d4-45a8-9429-a5514d8f413f\",\"name\":\"test3\",\"SKU\":\"asdads\",\"UPC\":\"543835494184\",\"EAN\":\"1619705549706\",\"MPN\":\"750769487549\",\"ISBN\":\"\",\"available_units\":123123,\"minimum_units\":1231223,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":12,\"uuid\":\"108b28a8-bc12-4ae4-8885-7ba01a557e3b\",\"name\":\"asdasd\",\"SKU\":\"asdasas\",\"UPC\":\"1212213\",\"EAN\":\"9993586106169\",\"MPN\":\"791989166360\",\"ISBN\":\"\",\"available_units\":123123,\"minimum_units\":21321231,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":5,\"uuid\":\"68a2b558-0673-4b3a-9449-7f7d5b6f8865\",\"name\":\"test4\",\"SKU\":\"asdasd\",\"UPC\":\"399255523677\",\"EAN\":\"7881628226344\",\"MPN\":\"104467804849\",\"ISBN\":\"\",\"available_units\":1,\"minimum_units\":1,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":15,\"uuid\":\"41c928e9-8435-473d-a4e3-404d9f3623e4\",\"name\":\"saq d dasc\",\"SKU\":\"asdfadsf\",\"UPC\":\"524914723206\",\"EAN\":\"7335763505618\",\"MPN\":\"367000795870\",\"ISBN\":\"\",\"available_units\":21312,\"minimum_units\":2132311,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":14,\"uuid\":\"7c99ee2a-8f74-40b6-827c-f838aad388f1\",\"name\":\"qewr\",\"SKU\":\"asdfasdffd\",\"UPC\":\"944762007072\",\"EAN\":\"5814203987410\",\"MPN\":\"901600833605\",\"ISBN\":\"\",\"available_units\":123312,\"minimum_units\":321312,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":11,\"uuid\":\"44cd2bfd-2dc5-42f0-aefd-bd46eaf4fed5\",\"name\":\"310-i4njdqw\",\"SKU\":\"asfdq32asdd\",\"UPC\":\"590044748116\",\"EAN\":\"9396115637621\",\"MPN\":\"971143364597\",\"ISBN\":\"\",\"available_units\":132312,\"minimum_units\":123123132,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":20,\"uuid\":\"75a5c8f1-6eb1-4a71-920c-d6439431a5e6\",\"name\":\"102934u9014j\",\"SKU\":\"dqedqwf\",\"UPC\":\"114490306331\",\"EAN\":\"1146143747261\",\"MPN\":\"146888035064\",\"ISBN\":\"\",\"available_units\":123,\"minimum_units\":123,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":10,\"uuid\":\"9c491ddd-7bcc-407b-9023-38f2e8ca19bb\",\"name\":\"831924cpy82n\",\"SKU\":\"qadsadva\",\"UPC\":\"812344786139\",\"EAN\":\"8339520796720\",\"MPN\":\"858175531265\",\"ISBN\":\"\",\"available_units\":3214,\"minimum_units\":4132,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":13,\"uuid\":\"89dde24f-6168-4bb3-b71a-5381e871fb07\",\"name\":\"asd gsng\",\"SKU\":\"s fsbsbv\",\"UPC\":\"779988282637\",\"EAN\":\"6186119776257\",\"MPN\":\"123077331486\",\"ISBN\":\"\",\"available_units\":123,\"minimum_units\":1232,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0},{\"id\":16,\"uuid\":\"bafc03c1-4c8e-4f35-b64b-9027292551af\",\"name\":\"asakldfasdfadsfa\",\"SKU\":\"sdfasdfadsfa\",\"UPC\":\"984194379198\",\"EAN\":\"4975280419334\",\"MPN\":\"284149973656\",\"ISBN\":\"\",\"available_units\":1231212,\"minimum_units\":3123,\"manufacturer\":\"\",\"brand\":\"\",\"dimensions\":\"\",\"image\":null,\"weight\":0}]");
};

// Error trying to add new product
export const addProduct = async (product) => {
  try {
    const productAdded = await axios.post(
      "http://localhost:8000/product/",
      product
    );
    console.log("Inside api call", productAdded);
    return productAdded;
  } catch (err) {
    return err;
  }
}; */
