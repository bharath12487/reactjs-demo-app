import React, { Component } from 'react'
import ApiService from "../service/ApiService";
import ReactPaginate from 'react-paginate';

class ListQuestionComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            mappings: [],
            roles: [],
            offset: 0,
            limit: 10,
            totalpagecount: 0,
            pageCount: 0
        }
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.reloadQuestionList = this.reloadQuestionList.bind(this);
    }

    
    componentDidMount() {
        this.setState({offset: 10})
        this.reloadQuestionList(this.state.limit, this.state.offset);
        this.reloadMappingRole();
    }

    reloadQuestionList(limit, offset) {
        const paramsdata = { 
            limit: limit,
            offset: offset
        }
        ApiService.fetchQuestions(paramsdata)
            .then((res) => {
                this.setState({questions: res.data.data, totalpagecount: res.data.total, pageCount: Math.ceil(res.data.total / this.state.limit)})
            });
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

    deleteQuestion(questionId) {
        ApiService.deleteQuestion(questionId)
           .then(res => {
               this.setState({questions: this.state.questions.filter(user => user.id !== questionId)});
           })

    }

    editQuestion(id) {
        window.localStorage.setItem("questionId", id);
        this.props.history.push('/edit-question');
    }

    addQuestion() {
        window.localStorage.removeItem("questionId");
        this.props.history.push('/add-question');
    }

    getRole(roleid){
       let role = this.state.roles.filter(role => role.id === roleid);
       if(role[0]){
            return role[0].name
       }
    }

    getMapping(mappingid){
        let mapping = this.state.mappings.filter(mapping => mapping.id === mappingid);
        if(mapping[0]){
            return mapping[0].name
        }
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 10);
    
        this.setState({ offset: offset }, () => {
            this.reloadQuestionList(this.state.limit, this.state.offset);
        });
      };

    render() {
        return (
            <div>
                <h2 className="text-center">Question Details</h2>
                <button className="btn btn-primary" style={{float: 'right'}} onClick={() => this.addQuestion()}> Add question</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Teaming Stages</th>
                            <th>Appears</th>
                            <th>Frequency</th>
                            <th>Question Type</th>
                            <th>Role</th>
                            <th>Mapping</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.questions.map(
                        question =>
                                    <tr key={question.id}>
                                        <td>{question.question }</td>
                                        <td>{question.teaming_stages}</td>
                                        <td>{question.appears}</td>
                                        <td>{question.frequency}</td>
                                        <td>{question.question_type}</td>
                                        <td>{this.getRole(question.role_id)}</td>
                                        <td>{this.getMapping(question.mapping_id)}</td>
                                        <td>
                                            <button className="btn btn-success btn-sizecontent" onClick={() => this.editQuestion(question.id)} style={{marginLeft: '20px'}}> Edit</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger btn-sizecontent" onClick={() => this.deleteQuestion(question.id)}> Delete</button>
                                        </td>
                                            
                                    </tr>
                            )
                        }
                    </tbody>
                        
                </table>
                {
                    this.state.totalpagecount > 10 &&
                <ReactPaginate 
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'page-item'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    />
                }
            </div>
        );
    }

}

export default ListQuestionComponent;