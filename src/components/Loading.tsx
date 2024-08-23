import styled from "styled-components";
import loading from "./../assets/loading.svg"

const Loading = () => {
    return ( 
        <CustomLoading>
            <img src={loading} alt="loading-gif" />
        </CustomLoading>
     );
}
 
export default Loading;

const CustomLoading = styled.div`
    margin: auto;
    
    img {
        width: 140px;
        aspect-ratio: 1;
    }
`