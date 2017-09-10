import './App.scss';

import React, {Component} from 'react';

import config from './config.json';
import mockInterface from './mockInterface';
import Alert from './Alert';
import Loading from './Loading';
import Form from './Form';
import Menu from './Menu';
import Table from './Table';
import Header from './Header';
import Markdown from './Markdown';
import KeysTable from './KeysTable';
import ChangePasswordForm from './ChangePasswordForm';

import classNameMapper from './classNameMapper';
require('./fetchPolyfill');


export default class App extends Component {
  
  constructor(props) {
    super(props);
		this.loadContent = this.loadContent.bind(this);
		this.renderContent = this.renderContent.bind(this);
		this.sendData = this.sendData.bind(this);
		
		this.componentMap = {
      Alert,
			Loading,
			Table,
			Form,
			Markdown,
			KeysTable,
			ChangePasswordForm,
		};
    const initialContent = config.menu[0].children[0];
		
		this.state = {
			menu: config.menu,
			content: initialContent.dataUrl ? {
				heading: initialContent.heading,
				componentName: 'Loading',
				componentProps: {
					children: 'Načítání: ' + (initialContent.heading || initialContent.dataUrl)
				}
			} : initialContent,
		};
  }
  
  componentWillMount() {
    const initialContent = config.menu[0].children[0];
    this.loadContent(initialContent);
  }
	
	sendData(updateUrl, body, method = 'POST') {
		if ( config.mockServer ) {
			const mockResponses = mockInterface[method + ':' + updateUrl];
			if ( !mockResponses ) {
				alert('Mock responses for ' + method + ':' + updateUrl + ' missing!');
				return;
			}
			return new Promise( (resolve, reject) => (
				setTimeout( function(){
					(Math.random() > 0.25) ? resolve( mockResponses.success ) : reject( mockResponses.fail )
				}, 1000)
			) );
		}
		return fetch(this.props.updateUrl, {
			method,
			body,
		}).then( (response = {})=>(
			response.ok ? response : (new Promise( (resolve, reject) => (
				reject({ errorCode: response.status || 400, errorMessage: response.statusText })
			) ))
		) );
	}
	
	loadContent(content) {
		const thisApp = this;
		if ( content.dataUrl ) {
			thisApp.setState({
				...thisApp.state,
				content: {
					...content,
					componentName: 'Loading',
					componentProps: {
						children: 'Načítání: ' + (content.heading || content.dataUrl)
					}
				},
			});
			
			if ( config.mockServer ) {
				const mockResponses = mockInterface['GET:' + content.dataUrl];
				if ( !mockResponses ) {
					alert('Mock responses for ' + 'GET:' + content.dataUrl + ' missing!');
					return;
				}
				return new Promise( (resolve, reject) => (
					setTimeout( function(){
						(Math.random() > 0.25) ? resolve( mockResponses.success ) : reject( mockResponses.fail )
					}, 1000)
				) ).then( (json)=>(
					thisApp.setState({
						...thisApp.state,
						content: {
							...content,
							...json,
						},
					})
				), (error)=>(
					thisApp.setState({
						...thisApp.state,
						content: {
							...content,
							componentName: 'Alert',
							componentProps: {
								danger: true,
								children: 'Chyba při komunikaci se serverem (' + error.errorCode + '): ' + error.errorMessage,
							},
						},
					})
				))
			} else {
				fetch(content.dataUrl)
					.then(function(response) {
						return response.json()
					}, (error) => {
						return thisApp.setState({
							...thisApp.state,
							content: {
								...content,
								componentName: 'Alert',
								componentProps: {
									danger: true,
									children: 'Chyba při komunikaci se serverem: ' + error,
								},
							},
						})
					} ).then(function(json) {
						thisApp.setState({
							...thisApp.state,
							content: {
								...content,
								...json,
							},
						});
					}).catch(function(ex) {
						thisApp.setState({
							...thisApp.state,
							content: {
								...content,
								componentName: 'Alert',
								componentProps: {
									danger: true,
									children: 'Odpověď serveru je neplatná: ' + ex
								},
							},
						});
					})
				;
			}
		} else {
			thisApp.setState({
				...thisApp.state,
				content,
			});
		}
	}
	
	renderContent(){
		let { componentName, componentProps = {}, heading } = this.state.content;

    const components = Array.isArray(componentName) ? componentName.map( (componentName, componentIndex) => {
      return {
        componentName,
        componentProps: componentProps[componentIndex]
      };
    } ) : [{
      componentName,
      componentProps
    }];

    return (<div className="Layout_content" >
      { heading ? <h2>{heading}</h2> : null }
      { components.map( ({componentName, componentProps}) => {
        console.log('componentName', componentName);
        if (!this.componentMap[componentName]) {
          componentProps = { warning: true, children: 'Component ' + componentName + ' not found! Available components: ' + Object.keys(this.componentMap).join(', ') };
          componentName = 'Alert';
        }
        const ContentComponent = this.componentMap[componentName];
          
        return <ContentComponent {...componentProps} sendData={this.sendData} />;
      } ) }
    </div>);
	}
	
	render() {
    return (<div className="App" >
      <Header />
        <main>
        <div className="Layout" >
          <aside className="Layout_aside" >
            <Menu menu={config.menu} loadContent={this.loadContent} />
          </aside>
          { this.renderContent() }
        </div>
      </main>
    </div>);
	}
}
