import React from 'react';
import {GuestTwoColumnLayout} from "../layouts";
import {Button} from "antd";
import Link from "next/link";


export default class HomePage extends React.Component {

    render = () => {
        return (
            <GuestTwoColumnLayout>
                <h1>Welcome to Store</h1>

                <Link href={'/store'}>
                    <Button type={'primary'}>
                        See Product Listing
                    </Button>
                </Link>
            </GuestTwoColumnLayout>
        )
    }

}