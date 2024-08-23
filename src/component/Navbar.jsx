import { QuestionCircleOutlined, MenuOutlined, HomeOutlined } from '@ant-design/icons';
import { FloatButton, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{
                    insetInlineEnd: 24,
                }}
                icon={<MenuOutlined />}
            >
            <Link to={"/help"}><FloatButton icon={<QuestionCircleOutlined />} /></Link>
            <Tooltip title="Home" placement='left'>
                <Link to={"/"}>
                    <FloatButton icon={<HomeOutlined />} />
                </Link>
            </Tooltip>
            </FloatButton.Group>
        </div>
    )
}

export default Navbar;