import { useEffect, useState } from 'react';

export default function Header() {

    const [data, setData] = useState(null);

    return (
        <>{data}</>
    );
}