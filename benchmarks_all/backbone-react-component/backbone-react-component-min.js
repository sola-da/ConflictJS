!function(a,b){"function"==typeof define&&define.amd?define(["react","react-dom","backbone","underscore"],b):"undefined"!=typeof module&&module.exports?module.exports=b(require("react"),require("react-dom"),require("backbone"),require("underscore")):b(a.React,a.ReactDOM,a.Backbone,a._)}(this,function(a,b,c,d){"use strict";function e(a,b,c){this.state={},this.component=a;var d,e,f=c||a.props||{};d=a.overrideModel&&"function"==typeof a.overrideModel?a.overrideModel():f.model,e=a.overrideCollection&&"function"==typeof a.overrideCollection?a.overrideCollection():f.collection,this.setModels(d,b),this.setCollections(e,b)}c.React||(c.React={}),c.React.Component||(c.React.Component={});var f=c.React.Component.mixin={childContextTypes:{hasParentBackboneMixin:a.PropTypes.bool.isRequired,parentModel:a.PropTypes.any,parentCollection:a.PropTypes.any},contextTypes:{hasParentBackboneMixin:a.PropTypes.bool,parentModel:a.PropTypes.any,parentCollection:a.PropTypes.any},getChildContext:function(){return{hasParentBackboneMixin:!0,parentModel:this.getModel(),parentCollection:this.getCollection()}},componentDidMount:function(){this.setElement(b.findDOMNode(this))},componentDidUpdate:function(){this.setElement(b.findDOMNode(this))},getInitialState:function(){var a={};return this.wrapper||(this.wrapper=new e(this,a)),a},componentWillMount:function(){this.wrapper||(this.wrapper=new e(this))},componentWillUnmount:function(){this.wrapper&&(this.wrapper.stopListening(),delete this.wrapper)},componentWillReceiveProps:function(a){var b=a.model,c=a.collection;this.wrapper.model&&b?this.wrapper.model!==b&&(this.wrapper.stopListening(),this.wrapper=new e(this,void 0,a)):b&&(this.wrapper=new e(this,void 0,a)),this.wrapper.collection&&c?this.wrapper.collection!==c&&(this.wrapper.stopListening(),this.wrapper=new e(this,void 0,a)):c&&(this.wrapper=new e(this,void 0,a))},$:function(){var a;if(this.$el)a=this.$el.find.apply(this.$el,arguments);else{var c=b.findDOMNode(this);a=c.querySelector.apply(c,arguments)}return a},getCollection:function(){return this.wrapper.collection||this.context.parentCollection},getModel:function(){return this.wrapper.model||this.context.parentModel},setElement:function(a){if(a&&c.$&&a instanceof c.$){if(a.length>1)throw new Error("You can only assign one element to a component");this.el=a[0],this.$el=a}else a&&(this.el=a,c.$&&(this.$el=c.$(a)));return this}};return d.extend(e.prototype,c.Events,{onError:function(a,b,c){c.silent||this.component.setState({isRequesting:!1,hasError:!0,error:b})},onInvalid:function(a,b,c){c.silent||this.component.setState({isInvalid:!0})},onRequest:function(a,b,c){c.silent||this.component.setState({isRequesting:!0,hasError:!1,isInvalid:!1})},onSync:function(a,b,c){c.silent||this.component.setState({isRequesting:!1})},setModels:function(a,b,c){var e="undefined"!=typeof a;if(e&&!a.attributes)if("object"==typeof a){var f=d.values(a);e=f.length>0&&f[0].attributes}else e=!1;e&&(this.model=a,this.setStateBackbone(a,void 0,b,c),this.startModelListeners(a))},setCollections:function(a,b,c){"undefined"!=typeof a&&(a.models||"object"==typeof a&&d.values(a)[0].models)&&(this.collection=a,this.setStateBackbone(a,void 0,b,c),this.startCollectionListeners(a))},setStateBackbone:function(a,b,c,d){if(a.models||a.attributes)this.setState.apply(this,arguments);else for(b in a)this.setStateBackbone(a[b],b,c)},getAttributes:function(a){var b=[];if(a instanceof c.Collection){for(var d=0;d<a.models.length;d++)b.push(a.models[d].attributes);return b}return a.attributes},setState:function(a,b,c,e){var f={},g=this.getAttributes(a);b?f[b]=g:a.models?f.collection=g:f.model=g,c?d.extend(c,f):e?(this.nextState=d.extend(this.nextState||{},f),d.defer(d.bind(function(){this.nextState&&(this.component.setState(this.nextState),this.nextState=null)},this))):this.component.setState(f)},startCollectionListeners:function(a,b){if(a||(a=this.collection),a)if(a.models)this.listenTo(a,"update change sort reset",d.partial(this.setStateBackbone,a,b,void 0,!0)).listenTo(a,"error",this.onError).listenTo(a,"request",this.onRequest).listenTo(a,"sync",this.onSync);else if("object"==typeof a)for(b in a)a.hasOwnProperty(b)&&this.startCollectionListeners(a[b],b)},startModelListeners:function(a,b){if(a||(a=this.model),a)if(a.attributes)this.listenTo(a,"change",d.partial(this.setStateBackbone,a,b,void 0,!0)).listenTo(a,"error",this.onError).listenTo(a,"request",this.onRequest).listenTo(a,"sync",this.onSync).listenTo(a,"invalid",this.onInvalid);else if("object"==typeof a)for(b in a)this.startModelListeners(a[b],b)}}),f.on=function(a,b){var c;c=a.wrapper?a.wrapper:new e(a),b.models&&c.setModels(b.models),b.collections&&c.setCollections(b.collections),a.wrapper=c},f.onModel=function(a,b){f.on(a,{models:b})},f.onCollection=function(a,b){f.on(a,{collections:b})},f.off=function(a,b){2===arguments.length?a.wrapper&&a.wrapper.stopListening(b):f.componentWillUnmount.call(a)},f});