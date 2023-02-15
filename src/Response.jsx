import React, { useState, useEffect, useContext } from 'react'
import $ from 'jquery'
import ResponseBody from './components/ResponseBody'
import ResponseHeaders from './components/ResponseHeaders'
import { ReceivedResponse } from './App'
import prettyBytes from 'pretty-bytes'

function Response() {
    const [activeResponseTab, setActiveResponseTab] = useState('response-body-tab')
    const receivedResponse = useContext(ReceivedResponse)

    function changeTab(e) {
        setActiveResponseTab(e.target.id)
    }

    useEffect(() => {
        switch (activeResponseTab) {
            case 'response-body-tab':
                $('#rh').hide(10);
                $('#rb').fadeIn('fast');
                break;
            case 'response-header-tab':
                $('#rb').hide(10)
                $('#rh').fadeIn('fast');
                break;
            default:
                $('#rh').hide(10);
                $('#rb').fadeIn('fast');
                break;
        }
        /*console.log(activeResponseTab)*/
    })

    function SetStatus() {
        // console.log(receivedResponse.response.status)
        // console.log(receivedResponse.error.status)
        if (receivedResponse.response.status === undefined && receivedResponse.error.status === undefined) {
            return <span data-status> - </span>
        } else if (receivedResponse.error.status != undefined) {
            return <span data-status>{receivedResponse.error.status}</span>
        } else {
            return <span data-status>{receivedResponse.response.status}</span>
        }
    }

    function SetTime() {
        // console.log(receivedResponse.time)
        if (receivedResponse.time === undefined || receivedResponse.time === null) {
            return <span data-time> - </span>
        } else {
            return <span data-time>{receivedResponse.time} ms</span>
            /**has a diff from actual time of +15s because of
             * calculating AFTER receiving the response from axios
             * rather than WHEN the response is received
             */
        }
    }

    function SetSize() {
        if (receivedResponse.response.data === undefined) {
            return <span data-status> - </span>
        } else {
            return <span data-status>{prettyBytes(JSON.stringify(receivedResponse.response.data).length + JSON.stringify(receivedResponse.response.headers).length)}</span>
        }
    }

    return (
        <>
            <div className='d-flex'>
                <h3>Response</h3>
            </div>

            <div data-response-metadata className='d-flex'>
                <div className='d-flex'>
                    <div className='me-4'>
                        Status: <SetStatus />
                    </div>
                    <div className='me-4'>
                        Time: <SetTime />
                    </div>
                    <div className=''>
                        Size: <SetSize />
                    </div>
                </div>
            </div>

            {/**Response body, response header */}
            <div data-response className=''>
                {/**Response Tabs */}
                <div className='mt-3'>
                    <ul className='nav nav-tabs' role='tablist'>
                        <li className='nav-item active' role='presentation'>
                            <button className={`nav-link ${activeResponseTab == 'response-body-tab' ? 'active' : ''}`} type='button' role='tab' id='response-body-tab'
                                onClick={changeTab}>
                                Body
                            </button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button className={`nav-link ${activeResponseTab == 'response-header-tab' ? 'active' : ''}`} type='button' role='tab' id='response-header-tab'
                                onClick={changeTab}>
                                Headers
                            </button>
                        </li>
                    </ul>
                </div>

                {/**Display Tab Content */}
                <div className='border rounded-bottom border-top-0'>
                    <div className='tab-content'>
                        <div id='rb'><ResponseBody /></div>
                        <div id='rh' style={{ display: 'none' }}><ResponseHeaders /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Response