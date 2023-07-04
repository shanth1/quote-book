import { useParams } from "react-router-dom";
import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";

const Box = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <Content>
            <H1>Box {id}</H1>
            <div>Content</div>
        </Content>
    );
};

export { Box };
