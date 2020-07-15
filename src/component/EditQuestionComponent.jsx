import React, { Component } from 'react'
import ApiService from "../service/ApiService";

class EditQuestionComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            pri: '',
            question: '',
            teaming_stages: '',
            appears: '',
            frequency: '',
            question_type: '',
            condiqtions: '',
            required: true,
            role_id: '',
            mapping_id: '',
            mappings: [],
            roles: [],
        }
        this.saveQuestion = this.saveQuestion.bind(this);
        this.loadQuestion = this.loadQuestion.bind(this);
    }

    componentDidMount() {
        this.loadQuestion();
        this.reloadMappingRole()
    }

    reloadMappingRole(){
        ApiService.fetchRoles()
        .then((res) => {
            this.setState({roles: res.data.data})
        });
        
        ApiService.fetchMappings()
            .then((res) => {
                this.setState({mappings: res.data.data})
            });
    }

    loadQuestion() {
        ApiService.fetchQuestionById(window.localStorage.getItem("questionId"))
            .then((res) => {
                let user = res.data.data;
                this.setState({
                id: user.id,
                pri: user.pri,
                question: user.question,
                teaming_stages: user.teaming_stages,
                appears: user.appears,
                frequency: user.frequency,
                question_type: user.question_type,
                condiqtions: user.condiqtions,
                required: user.required,
                role_id: user.role_id,
                mapping_id: user.mapping_id,
                })
            });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    saveQuestion = (e) => {
        e.preventDefault();
        let question = {id: this.state.id, pri: this.state.pri, question: this.state.question, teaming_stages: this.state.teaming_stages, appears: this.state.appears, frequency: this.state.frequency, question_type: this.state.question_type, condiqtions: this.state.condiqtions, required: this.state.required, role_id: this.state.role_id, mapping_id: this.state.mapping_id};
        if(question.pri === '' || question.question === '' || question.condiqtions ===''){
            alert("Please check all fileds in form")
        }
        else{
        ApiService.editQuestion(question)
            .then(res => {
                this.props.history.push('/questions');
            });
        }
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit User</h2>
                <form>
                    <div className="form-group">
                        <label>Pri:</label>
                        <input type="number" placeholder="pri" name="pri" className="form-control" value={this.state.pri} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Question:</label>
                        <input type="text" placeholder="Question" name="question" className="form-control" value={this.state.question} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Teaming Stages:</label>
                        <input placeholder="Teaming Stages" name="teaming_stages" className="form-control" value={this.state.teaming_stages} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Appears:</label>
                        <input type="number" placeholder="Appears" name="appears" className="form-control" value={this.state.appears} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Frequency:</label>
                        <input type="number" placeholder="Frequency" name="frequency" className="form-control" value={this.state.frequency} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Question Type:</label>
                        <input type="text" placeholder="Question Type" name="question_type" className="form-control" value={this.state.question_type} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Condiqtions:</label>
                        <input type="text" placeholder="Condiqtions" name="condiqtions" className="form-control" value={this.state.condiqtions} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                    <label>Required:</label>
                    <select value={this.state.required} className="form-control" name="required" onChange={this.onChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    </div>
                    <div className="form-group">
                    <label>Role:</label>
                    <select value={this.state.role_id} className="form-control" name="role_id" onChange={this.onChange}>
                    <option value="">Select any role</option>
                    {this.state.roles.map(
                            role =>
                    <option  key={role.id} value={role.id}>{role.name}</option>
                        )
                        }
                    </select>
                    </div>
                    <div className="form-group">
                    <label>Mapping:</label>
                    <select value={this.state.mapping_id} className="form-control" name="mapping_id" onChange={this.onChange}>
                    {this.state.mappings.map(
                            mapping =>
                    <option  key={mapping.id} value={mapping.id}>{mapping.name}</option>
                        )
                        }
                    </select>
                    </div>
                    <button className="btn btn-success" onClick={this.saveQuestion}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditQuestionComponent;