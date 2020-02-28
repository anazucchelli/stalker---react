import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Navbar, 
    Input, 
    Button, 
    InputGroup, 
    InputGroupAddon, 
    Container, 
    Col, 
    Form, 
    Card, 
    CardImg, 
    CardText, 
    CardBody, 
    Spinner,
    CardTitle, 
    CardSubtitle, 
    Row} from 'reactstrap';
import { MdSearch } from 'react-icons/md';
import { GiStarSwirl } from "react-icons/gi";


class Home extends Component{
    state = {
        carregando: false, 
        meteoro: []

    }
    // Função, função stalkeatr
    meteoroDaPaixao = async(evento)=>{
        evento.preventDefault()

        this.setState({carregando: true})
        
        const form = evento.target
        const InputGroup = form.children[0]
        const input = InputGroup.children[0]

        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=AoNJdmK7IBvV0sGpcM00lvr4kRh4jFuSeaZbCYZk`)
        this.setState({meteoro: [meteoro.data, ...this.state.meteoro], carregando: false})
        console.log(meteoro.data)

        // const { data: seguidores} = await axios(`https://api.github.com/users/${input.value}/followers`)
        // this.setState({ seguidores })

        
    }
        render(){
            return(
                <>

                <Navbar color="dark">
                    <Container className="d-flex justify-content-center">
                        
                            <img className="rounded-circle border border-white mr-3" 
                            width="50"
                            src="https://www.thispersondoesnotexist.com/image" 
                            alt="pessoa aleatoria" />
                            <span className="text-white" >
                                Logado como
                            <Link className="text-white font-weight-bold ml-3" to="/">
                                { this.props.match.params.usuario }
                            </Link>
                            </span>
                        
                    </Container>
                </Navbar>


                    <Navbar color="dark" fixed="bottom">
                        <Container className="d-flex justify-content-center">
                            <Col xs="12" md="6">
                            
                                <Form onSubmit={this.meteoroDaPaixao} >
                                    <InputGroup>
                                        <Input type="date"/>
                                        <InputGroupAddon addonType="append">
                                            <Button color="danger">
                                                { this.state.carregando ? ( <Spinner color="light" size="sm"/> ) : (<MdSearch size="20"/>) }                                                
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Container>
                    </Navbar>

                    
                    
                     {this.state.carregando ? (               
                            <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                                <Spinner color="dark" size="lg"/>
                                <span>Carregando...</span>
                            </Container> 
                        ) : (
                            // Cards onde aparecem a noticia quando carrega uma nova 
                            <Container className="mt-3 mb-5 ">
                                <Row>
                            {/* se é um array eu posso percorrer o objeto usando o map e se tiver conteudo
                            Só executa se tiver coisa no 'meteoro/array*/ }
                            {this.state.meteoro.map((meteoro) => (
                                <Col xs="12" md="4" className="d-flex">
                                <Card className="text-white mb-2"  color="dark">
                                    <CardImg top width="90%" height="30%" src={meteoro.url} alt={meteoro.title} />
                                        <CardBody >
                                            <CardTitle className="h3 text-center">{meteoro.title}</CardTitle>
                                            <CardSubtitle className="text-muted text-center" >{meteoro.date.split('-').reverse().join('/')}</CardSubtitle>
                                            <CardText className="text-justify" >{meteoro.explanation}</CardText>
                                        </CardBody>
                                </Card> 
                                </Col>
                            ))}
                                </Row>
                            </Container>
                        )}

                         { this.state.meteoro.length === 0 && (
                             <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                             <GiStarSwirl color="#000" size="150px"/>
                             <h5>Digite uma data e descubra o astro do dia</h5>
                         </Container> 
                         ) }
                        

                        
                     {/* .......Carregando........ */}
                        {/* {this.state.carregando && (               
                            <Container className="h-100 d-flex flex-column justify-content-center aign-items-center">
                                <Spinner color="dark" size="lg"/>
                                <span>Carregando...</span>
                            </Container> 
                        )} */}


                </>

                )
            }
        }
export default Home