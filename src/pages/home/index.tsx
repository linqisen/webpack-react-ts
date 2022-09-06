import React from "react";
import { Button } from "antd";
import styles from './index.module.scss'

const Home = () => {
    return (
        <div className={styles["home-page"]}>
            home1<Button type="primary">点击</Button>
        </div>
    );
};

export default Home;
