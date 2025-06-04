import axios from "axios";

const imgaeUploade = async imageData => {
    const formData = new FormData()
    formData.append('image', imageData)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
    const image_url = data.data.display_url;
    return image_url
};

export default imgaeUploade;