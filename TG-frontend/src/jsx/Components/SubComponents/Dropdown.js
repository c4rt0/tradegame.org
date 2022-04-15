import React, { useRef, useEffect } from 'react';

const Dropdown = (props) => {
    const [show, setShow] = React.useState(props.show)
    useEffect(() => {
        setShow(props.show)
    }, [props.show])


    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target))
            props.setShow(false);
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    });
    return (
        <div>
            {
                show ? (
                    <div ref={ref} className='z-10' >
                        {props.children}
                    </div >
                ) : null}
        </div>
    )
}

export default Dropdown