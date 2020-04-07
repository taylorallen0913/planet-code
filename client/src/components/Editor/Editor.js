import React, { Component } from "react";

import "./Editor.css";
import { Controlled as CodeMirror } from "react-codemirror2";

import PropTypes from "prop-types";
import { connect } from "react-redux";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/python/python.js");

const axios = require("axios");

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};

const options = {
  mode: "python",
  theme: "material",
  lineNumbers: true,
  scrollbarStyle: null
};

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      pythonCode: "",
      jsCode: "",
      cppCode: "",
      cSharpCode: "",
      javaCode:
        'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("hello, world");\n\t}\n}',
      value: "",
      token: "",
      currentLanguage: "0",
      selectionValue: null,
      expectedOutput: this.props.expected,
      questionName: this.props.questionName,
      questionDescription: this.props.questionDescription,
      questionId: this.props.id
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({ user });
  }

  submitCode = async () => {
    let token = "";

    // Get coding language selected
    let e = document.getElementById("language-selector");
    var language_num = e.options[e.selectedIndex].value;
    var language = 0;
    if (language_num == 1) {
      // Python
      language = 71;
    } else if (language_num == 2) {
      // Javascript
      language = 63;
    } else if (language_num == 3) {
      // C++
      language = 54;
    } else if (language_num == 4) {
      // C#
      language = 51;
    } else if (language_num == 5) {
      // Java
      language = 62;
    }

    const reqBody = {
      source_code: this.state.value,
      language_id: language
    };

    if (this.state.expectedOutput != "") {
      reqBody.expected_output = this.state.expectedOutput;
    }

    // Request to submit source code and langauge, start compilation
    await axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/?base64_encoded=false&wait=false",
        reqBody
      )
      .then(
        response => {
          console.log(response);
          token = response.data.token;
          this.setState({ token: response.data.token });
        },
        error => {
          console.log(error);
        }
      );

    setTimeout(this.compileCode, 3000);
  };

  compileCode = async () => {
    let statusCode = -1;

    let COMPILE_URL =
      "https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/" +
      this.state.token +
      "?base64_encoded=false&fields=stdout,stderr,status_id,language_id";
    await axios.get(COMPILE_URL, config).then(
      response => {
        this.changeOutput(response.data.stdout);
        statusCode = response.data.status_id;
      },
      error => {
        console.log(error);
      }
    );
    if (statusCode === 1) {
      console.log("In Queue");
    }
    if (statusCode === 2) {
      console.log("Processing");
    }
    if (statusCode === 3) {
      if (this.state.expectedOutput != "") {
        this.questionCorrect();
        this.changeDebug("Your answer was correct.");
      } else {
        this.changeDebug("Your program compiled and ran successfully.");
      }
    }
    if (statusCode === 4) {
      console.log("Wrong Answer");
      this.changeDebug("Your answer was incorrect.");
    }
    if (statusCode === 5) {
      console.log("Time Limit Exceeded");
      this.changeOutput("Error.");
      this.changeDebug("The time limit was exceeded.");
    }
    if (statusCode === 6) {
      console.log("Compilation Error");
      this.changeOutput("Error.");
      this.changeDebug("Error during compiling.");
    }
    if (statusCode >= 7 && statusCode <= 12) {
      console.log("Runtime Error");
      this.changeOutput("Error.");
      this.changeDebug("Runtime error occured.");
    }
    if (statusCode === 13) {
      console.log("Internal Error");
      this.changeOutput("Error.");
      this.changeDebug("Internal error occured.");
    }
    if (statusCode === 14) {
      console.log("Exec Format Error");
      this.changeOutput("Error.");
      this.changeDebug("Exec format error occured.");
    }
  };

  changeOutput = o => {
    document.getElementById("output-box").value = o;
  };

  changeDebug = o => {
    document.getElementById("debug-box").value = o;
  };

  runCode = () => {
    this.changeDebug("Compiling...");
    this.submitCode();
  };

  saveCodeToState = code => {
    this.setState({ value: code });
  };

  onSelectionChange = async () => {
    // Store language selected into a variable
    const oldLang = this.state.currentLanguage;
    const selection = this.getLanguage();

    // Update current language in state to selection
    this.setState({ currentLanguage: selection }, () => {
      console.log("New language: " + this.state.currentLanguage);
    });
    console.log(this.state.currentLanguage);

    // Load new code after switch
    this.changeLanguages(selection);
  };

  changeLanguages = async currentLanguage => {
    if (currentLanguage == 1) {
      // Python
      this.setState({ value: this.state.pythonCode });
    } else if (currentLanguage == 2) {
      // Javascript
      this.setState({ value: this.state.jsCode });
    } else if (currentLanguage == 3) {
      // C++
      this.setState({ value: this.state.cppCode });
    } else if (currentLanguage == 4) {
      // C#
      this.setState({ value: this.state.cSharpCode });
    } else if (currentLanguage == 5) {
      // Java
      this.setState({ value: this.state.javaCode });
    }
  };

  getLanguage = () => {
    let e = document.getElementById("language-selector");
    let language_num = e.options[e.selectedIndex].value;
    return language_num;
  };

  questionCorrect = async () => {
    const { user } = this.state;
    axios
      .post("/api/correct", {
        userId: user.id,
        questionId: this.props.questionId
      })
      .then(res => {})
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="uk-grid" uk-grid>
        <div className="uk-width-1-2">
          <div className="question">
            <h1 className="question-name">{this.state.questionName}</h1>
            <p className="question-description">
              {this.state.questionDescription}
            </p>
            <br />
            <br />
            <br />
            <br />
            <p className="question-description">{this.props.hint}</p>
          </div>
        </div>
        <div className="uk-width-1-2">
          <CodeMirror
            editorDidMount={editor => {
              this.instance = editor;
            }}
            value={this.state.value}
            options={options}
            onBeforeChange={(editor, data, value) => {
              this.setState({ value });
            }}
            onChange={(editor, data, value) => {
              this.saveCodeToState(value);
            }}
          />

          <textarea id="output-box" readOnly></textarea>
          <textarea id="debug-box" readOnly></textarea>
          <div className="bottomPart">
            <div className="box-one">
              <select
                onChange={this.onSelectionChange}
                id="language-selector"
                className="custom-select select-menu"
                data-live-search="true"
              >
                <option selected>Language</option>
                <option value="1">Python</option>
                <option value="2">Javascript</option>
                <option value="5">Java</option>
              </select>
            </div>
            <div className="box-two">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.runCode}
              >
                Run Code
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Editor);
