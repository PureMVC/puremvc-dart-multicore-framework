/**
 * The interface definition for a PureMVC [MVCFacade]. 
 * 
 * The Facade Pattern suggests providing a single
 * class to act as a central point of communication 
 * for a subsystem. 
 * 
 * In PureMVC, the [IFacade] acts as an interface between
 * the core MVC actors (IModel], [IView], [IController) and
 * the rest of your application.
 * 
 * See [IModel], [IView], [IController], [IProxy], [IMediator], [ICommand], [INotification]
 */
interface IFacade extends INotifier
{

    /**
     * Register an [IProxy] with an [IModel], by name.
     * 
     * Param [proxy] - the [IProxy] to be registered with the [IModel].
     */
    void registerProxy( IProxy proxy );

    /**
     * Retrieve a [IProxy] from an [IModel], by name.
     * 
     * Param [proxyName] - the name of the [IProxy] instance to be retrieved.
     * Returns the [IProxy] previously regisetered by [proxyName] with the [IModel].
     */
    IProxy retrieveProxy( String proxyName );
    
    /**
     * Remove an [IProxy] instance from the [Model] by name.
     *
     * Param [proxyName] - the [IProxy] to remove from the [Model].
     * Returns the [IProxy] that was removed from the [Model]
     */
    IProxy removeProxy( String proxyName );

    /**
     * Check if a Proxy is registered
     * 
     * Param [proxyName]
     * Returns [bool] - whether a Proxy is currently registered with the given [proxyName].
     */
    bool hasProxy( String proxyName );

    /**
     * Register an [ICommand] with the [Controller].
     * 
     * Param [noteName] - the name of the [INotification] to associate the [ICommand] with.
     * Param [commandClassRef] - a reference to the Class constructor of the [ICommand].
     */
    void registerCommand( String noteName, Function commandClassRef );
    
    /**
     * Remove a previously registered [ICommand] to [INotification] mapping from the Controller.
     * 
     * Param [notificationName] - the name of the [INotification] to remove the [ICommand] mapping for
     */
    void removeCommand( String notificationName );

    /**
     * Check if a Command is registered for a given Notification 
     * 
     * Param [notificationName]
     * Returns [bool] - whether a Command is currently registered for the given [notificationName].
     */
    bool hasCommand( String notificationName );
    
    /**
     * Register an [IMediator] instance with the [View].
     * 
     * Param [mediator] - a reference to the [IMediator] instance
     */
    void registerMediator( IMediator mediator );

    /**
     * Retrieve an [IMediator] instance from the [View].
     * 
     * Param [mediatorName] - the name of the [IMediator] instance to retrievve
     * Returns the [IMediator] previously registered in this core with the given [mediatorName].
     */
    IMediator retrieveMediator( String mediatorName );

    /**
     * Remove a [IMediator] instance from the [View].
     * 
     * Param [mediatorName] - name of the [IMediator] instance to be removed.
     * Returns the [IMediator] instance previously registered in this core with the given [mediatorName].
     */
    IMediator removeMediator( String mediatorName );
    
    /**
     * Check if a Mediator is registered or not
     * 
     * Param [mediatorName]
     * Returns [bool] - whether an [IMediator] is registered in this core with the given [mediatorName].
     */
    bool hasMediator( String mediatorName );

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
     * Param [notification] the [INotification] to have the [View] notify [Observers] of.
     */
    void notifyObservers( INotification notification );

    /**
     * This IFacade's Multiton Key
     */
    void set multitonKey( String key );
    String get multitonKey();
    
    /**
     * This IFacade's IModel
     */
    void set model( IModel modelInstance );
    IModel get model();
    
    /**
     * This IFacade's IView
     */
    void set view( IView viewInstance );
    IView get view();
    
    /**
     * This IFacade's IController
     */
    void set controller( IController controllerInstance );
    IController get controller();
    
}
