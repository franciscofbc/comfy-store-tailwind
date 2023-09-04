import { useLoaderData } from "react-router-dom";
import { Hero } from "../components";
import { customFetch } from "../utils";

const url = '/products?featured=true'

export const loader = async () => {
  const response = await customFetch.get(url)
  const products = response.data.data
  return { products }
}

const Landing = () => {
  const data = useLoaderData()
  console.log(data);

  return <>
    <Hero />
  </>
};

export default Landing;
