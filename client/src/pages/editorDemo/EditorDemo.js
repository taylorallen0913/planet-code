import React from 'react';
import Editor from '../Editor';

class EditorDemo extends React.Component {
    render() {
        return (
            <div>
                <Editor
                    expected=""
                    questionName="Editor"
                    questionDescription="This is a demo editor"
                />
            </div>
        );
    }
}

export default EditorDemo;
