/**
 * A base Multiton [IFacade] implementation.
 * 
 * The Facade Pattern suggests providing a single
 * class to act as a central point of communication 
 * for a subsystem. 
 * 
 * In PureMVC, the [IFacade] acts as an interface between
 * the core MVC actors [IModel], [IView], [IController) and
 * the rest of your application.
 * 
 * See [MVCModel], [MVCView], [MVCController], [INotification], [ICommand], [IMediator], [IProxy]
 */
class MVCFacade implements IFacade
{
  /**
   * Constructor. 
   * 
   * This [IFacade] implementation is a Multiton, 
   * so you should not call the constructor 
   * directly, but instead call the static getInstance method, 
   * passing the unique key for this instance 
   * 
   * Throws [FacadeExistsError] if instance for this Multiton key has already been constructed
   * 
   */
  MVCFacade( String key ) 
  {
    if ( instanceMap[ key ] != null ) throw new FacadeExistsError();
    initializeNotifier( key );
    instanceMap[ multitonKey ] = this;
    initializeFacade();    
  }

  /**
   * Initialize the Multiton [MVCFacade] instance.
   * 
   * Called automatically by the constructor. Override in your
   * subclass to do any subclass specific initializations. Be
   * sure to call [super.initializeFacade()], though.
   */
  void initializeFacade(  )
  {
    initializeModel();
    initializeController();
    initializeView();
  }

  /**
   * Facade Multiton Factory method
   * 
   * Returns [IFacade] the Multiton instance of the [IFacade]
   */
  static IFacade getInstance( String key )
  {
    if ( instanceMap == null ) instanceMap = new Map<String,IFacade>();
    if ( instanceMap[ key ] == null ) instanceMap[ key ] = new MVCFacade( key );
    return instanceMap[ key ];
  }

  /**
   * Initialize the [IController].
   * 
   * Called by the [initializeFacade] method.
   * Override this method in your subclass of [MVCFacade] 
   * if one or both of the following are true:
   * - You wish to initialize a different [IController].
   * - You have [ICommands] to register with the [IController] at startup.
   *          
   * If you don't want to initialize a different [IController], 
   * call [super.initializeController()] at the beginning of your
   * method, then register [ICommand]s.
   */
  void initializeController( )
  {
    if ( controller != null ) return;
    controller = MVCController.getInstance( multitonKey );
  }

  /**
   * Initialize the [IModel].
   * 
   * Called by the [initializeFacade] method.
   * Override this method in your subclass of [MVCFacade] 
   * if one or both of the following are true:
   * 
   * - You wish to initialize a different [IModel].
   * - You have [IProxy]s to register with the Model that do not retrieve a reference to the MVCFacade at construction time. 
   * 
   * If you don't want to initialize a different [IModel], 
   * call [super.initializeModel()] at the beginning of your
   * method, then register [IProxy]s. 
   * 
   * Note: This method is rarely overridden; in practice you are more
   * likely to use an [ICommand] to create and register [MVCProxy]s
   * with the [IModel].
   */
  void initializeModel( )
  {
    if ( model != null ) return;
    model = MVCModel.getInstance( multitonKey );
  }
  

  /**
   * Initialize the [IView].
   * 
   * Called by the [initializeFacade] method.
   * Override this method in your subclass of [Facade] 
   * if one or both of the following are true:
   * 
   * -  You wish to initialize a different [IView].
   * -  You have [IObservers] to register with the [IView]
   * 
   * If you don't want to initialize a different [IView], 
   * call [super.initializeView()] at the beginning of your
   * method, then register [IMediator] instances.
   * 
   * Note: This method is rarely overridden; in practice you are more
   * likely to use an [ICommand] to create and register [Mediator]s
   * with the [IView]. 
   */
  void initializeView( )
  {
    if ( view != null ) return;
    view = MVCView.getInstance( multitonKey );
  }

  /**
   * Register an [ICommand] with the [Controller].
   * 
   * Param [noteName] - the name of the [INotification] to associate the [ICommand] with.
   * Param [commandClassRef] - a reference to the concrete [Class] of the [ICommand].
   */
  void registerCommand( String noteName, Function commandClassRef ) 
  {
    controller.registerCommand( noteName, commandClassRef );
  }

  /**
   * Remove a previously registered [ICommand] to [INotification] mapping from the [IController].
   * 
   * Param [notificationName] - the name of the [INotification] to remove the [ICommand] mapping for
   */
  void removeCommand( String notificationName )
  {
    controller.removeCommand( notificationName );
  }

  /**
   * Check if a Command is registered for a given Notification 
   * 
   * Param [notificationName]
   * Returns [bool] - whether a Command is currently registered for the given [notificationName].
   */
  bool hasCommand( String notificationName )
  {
    return controller.hasCommand( notificationName );
  }

  /**
   * Register an [IProxy] with an [IModel], by name.
   * 
   * Param [proxy] - the [IProxy] to be registered with this core's [IModel].
   */
  void registerProxy( IProxy proxy )
  {
    model.registerProxy( proxy );
  }
          
  /**
   * Retrieve a [IProxy] from an [IModel], by name.
   * 
   * Param [proxyName] - the name of the [IProxy] instance to be retrieved.
   * Returns the [IProxy] previously regisetered by [proxyName] with the [IModel].
   */
  IProxy retrieveProxy( String proxyName ) 
  {
    return model.retrieveProxy( proxyName );    
  }

  /**
   * Remove an [IProxy] instance from the [Model] by name.
   *
   * Param [proxyName] - the [IProxy] to remove from the [Model].
   * Returns the [IProxy] that was removed from the [Model]
   */
  IProxy removeProxy( String proxyName ) 
  {
    IProxy proxy;
    if ( model != null ) proxy = model.removeProxy ( proxyName );    
    return proxy;
  }

  /**
   * Check if a Proxy is registered
   * 
   * Param [proxyName]
   * Returns [bool] - whether a Proxy is currently registered with the given [proxyName].
   */
  bool hasProxy( String proxyName )
  {
    return model.hasProxy( proxyName );
  }

  /**
   * Register an [IMediator] instance with the [View].
   * 
   * Param [mediator] - a reference to the [IMediator] instance
   */
  void registerMediator( IMediator mediator ) 
  {
    if ( view != null ) view.registerMediator( mediator );
  }

  /**
   * Retrieve an [IMediator] instance from the [View].
   * 
   * Param [mediatorName] - the name of the [IMediator] instance to retrievve
   * Returns the [IMediator] previously registered in this core with the given [mediatorName].
   */
  IMediator retrieveMediator( String mediatorName ) 
  {
    return view.retrieveMediator( mediatorName );
  }

  /**
   * Remove a [IMediator] instance from the [View].
   * 
   * Param [mediatorName] - name of the [IMediator] instance to be removed.
   * Returns the [IMediator] instance previously registered in this core with the given [mediatorName].
   */
  IMediator removeMediator( String mediatorName ) 
  {
    IMediator mediator;
    if ( view != null ) mediator = view.removeMediator( mediatorName );            
    return mediator;
  }

  /**
   * Check if a Mediator is registered or not
   * 
   * Param [mediatorName]
   * Returns [bool] - whether an [IMediator] is registered in this core with the given [mediatorName].
   */
  bool hasMediator( String mediatorName )
  {
    return view.hasMediator( mediatorName );
  }

  /**
   * Send an [INotification].
   * 
   * Convenience method to prevent having to construct new 
   * notification instances in our implementation code.
   * 
   * Param [noteName] the name of the notification to send
   * Param [body] - the body of the notification (optional)
   * Param [type] - the type of the notification (optional)
   */ 
  void sendNotification( String noteName, [Dynamic body, String type] )
  {
    notifyObservers( new MVCNotification( noteName, body, type ) );
  }

  /**
   * Register an [IObserver] to be notified of [INotifications] with a given name.
   * 
   * Typically the developer does not need to use this method, as [ICommand]s and 
   * [IMediator]s are registered as [IObserver]s by other means. However, this method
   * allows any arbitrary class instance to be notified.  
   * 
   * Param [noteName] - the name of the [INotifications] to notify this [IObserver] of
   * Param [observer] - the [IObserver] to register
   */
  void registerObserver( String noteName, IObserver observer )
  {
    view.registerObserver(noteName, observer);
  }

  /**
   * Remove an [IObserver] from the observer list for a given [Notification] name.
   * 
   * Typically the developer does not need to use this method, as Commands and 
   * Mediators are registered as [IObserver]s by other means. However, this can
   * allow any arbitrary class instance to be notified.  
   * 
   * Param [noteName] - which observer list to remove from 
   * Param [notifyContext] - remove the observers with this object as their notifyContext
   */
  void removeObserver( String noteName, Object notifyContext )
  {
    view.removeObserver( noteName, notifyContext );
  }

  /**
   * Notify [Observer]s.
   * 
   * This method is left public mostly for backward 
   * compatibility, and to allow you to send custom 
   * notification classes using the facade.
   * 
   * Usually you should just call sendNotification
   * and pass the parameters, never having to 
   * construct the notification yourself.
   * 
   * Param [note] the [INotification] to have the [View] notify [Observers] of.
   */
  void notifyObservers( INotification note )
  {
    if ( view != null ) view.notifyObservers( note );
  }

  /**
   * Initialize this [INotifier] instance.
   *
   * This is how a [Notifier] gets its [multitonKey]. 
   * Calls to [sendNotification] or to access the
   * facade will fail until after this method 
   * has been called.
   * 
   * Param [key] - the [multitonKey] for this [INotifier] to use
   */
  void initializeNotifier( String key )
  {
    multitonKey = key;
  }

  /**
   * Check if a Core is registered or not
   * 
   * Param [key] - the multiton key for the Core in question
   * Returns [bool] - whether a core is registered with the given [key].
   */
  static bool hasCore( String key ) 
  {
    return ( instanceMap[ key ] != null );
  }

  /**
   * Remove a Core.
   * <P>
   * Remove the Model, View, Controller and Facade 
   * instances for the given key.</P>
   * 
   * @param multitonKey of the Core to remove
   */
  static void removeCore( String key )
  {
    if ( instanceMap[ key ] == null ) return;
    MVCModel.removeModel( key ); 
    MVCView.removeView( key );
    MVCController.removeController( key );
    instanceMap[ key ] = null;
  }

  // References to Model, View, and Controller
  IController controller;
  IModel model;
  IView view;
  
  // The Multiton Key for this app
  String multitonKey;
  
  // The Multiton Facade instanceMap.
  static Map<String,IFacade> instanceMap;
}

class FacadeExistsError {
  const FacadeExistsError();

  String toString() {
    return "Facade instance for this Multiton key already constructed!";
  }
}

    