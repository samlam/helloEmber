App = Ember.Application.create();

// App.Router.map(function() {
//   // put your routes here
// });

// App.IndexRoute = Ember.Route.extend({
//   model: function() {
//     return ['red', 'yellow', 'blue'];
//   }
// });
App.Router.map(function(){
	this.resource('about');
	this.resource('posts', function(){
		this.resource('post', {path:':post_id'});
	});
	
});

App.PostsRoute = Ember.Route.extend({
	model: function (){
		return posts;
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params){
		return posts.findBy('id', parseInt(params.post_id));
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	actions:{
		edit: function(){
			this.set('isEditing',true);
		},
		doneEditing: function(){
			this.set('isEditing', false);
		}
	}
});

Ember.Handlebars.helper('format-date', function(date){
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input){
	return new Handlebars.SafeString(showdown.makeHtml(input));
});

var posts = [{
	id: 1,
	title:'Title here',
	author: {name:"author 1"},
	date: new Date('12/1/2013'),
	excerpt:'kasdf lskadf lskdfl asdfl asldflaskdfl; s',
	body: 'Monetize architectures reinvent **data-driven** mindshare, transform, [reinvent e-tailers channels](http://test.com) beta-test beta-test beta-test wireless customized vertical strategic vertical. Infrastructures incentivize action-items harness envisioneer real-time repurpose value peer-to-peer strategize supply-chains standards-compliant?" Networkeffects, leverage embrace ubiquitous distributed user-centred optimize channels relationships enable matrix plug-and-play viral, user-centred, addelivery. Cluetrain leading-edge, sexy frictionless embrace, bricks-and-clicks communities podcasting, front-end, granular envisioneer dot-com utilize. Back-end enable matrix target repurpose reintermediate web services viral exploit blogging facilitate enable, "platforms transform: syndicate seize iterate."'
},{
	id: 2,
	title:'2nd Title here',
	author: {name:"author 2"},
	date: new Date('12/12/2013'),
	excerpt:'addelivery efficient scalable frictionless technologies',
	body: 'Integrated engage *interactive e-services* networkeffects eyeballs networks transparent. **Testing** here cross-platform facilitate generate; compelling out-of-the-box communities paradigms productize incentivize granular morph; networkeffects matrix. Back-end benchmark generate e-markets engage convergence aggregate virtual morph redefine? Ecologies weblogs, convergence visionary ecologies scale revolutionize next-generation. Value-added bleeding-edge virtual integrateAJAX-enabled vortals harness ubiquitous rich-clientAPIs syndicate. Social envisioneer orchestrate disintermediate enterprise redefine integrate platforms: tagclouds schemas podcasts virtual'
}];