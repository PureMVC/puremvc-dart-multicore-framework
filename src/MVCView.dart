/**
 * A Multiton [IView]IView[IView] implementation.
 * 
 * In PureMVC, [IView] implementors assume these responsibilities:
 * 
 * In PureMVC, the [View] class assumes these responsibilities:
 * - Maintain a cache of [IMediator] instances.
 * - Provide methods for registering, retrieving, and removing [IMediators].
 * - Managing the observer lists for each [INotification] in the application.
 * - Providing a method for attaching [IObservers] to an [INotification]'s observer list.
 * - Providing a method for broadcasting an [INotification].
 * - Notifying the [IObservers] of a given [INotification] when it broadcast.
 * 
 * See [IMediator], [IObserver], [INotification]
 */
class MVCView implements IView
{
    
  /**
   * Constructor. 
   * 
   * This [IView] implementation is a Multiton, 
   * so you should not call the constructor 
   * directly, but instead call the static Multiton 
   * [getInstance] method
   * 
   * Throws [ViewExistsError] if instance for this Multiton key has already been constructed
   */
  MVCView( String key )
  {
    if (instanceMap[ key ] != null) throw new ViewExistsError();
    multitonKey = key;
    instanceMap[ multitonKey ] = this;
    mediatorMap = new Map<String,IMediator>();
    observerMap = new Map<String,List<IObserver>>();    
    initializeView();    
  }
  
  /**
   * Initialize the Multiton View instance.
   * 
   * Called automatically by the constructor, this
   * is your opportunity to initialize the Multiton
   * instance in your subclass without overriding the
   * constructor.
   */
  void initializeView(  ){}

  /**
   * View Multiton Factory method.
   * 
   * Returns [IView] the [IView] instance for the given multitonKey
   */
  static IView getInstance( String key )
  {
    if ( instanceMap == null ) instanceMap = new Map<String,IView>();
    if ( instanceMap[ key ] == null ) instanceMap[ key ] = new MVCView( key );
    return instanceMap[ key ];
  }
          
  /**
   * Register an [IObserver] to be notified
   * of [INotifications] with a given name.
   * 
   * Param [noteName] - the name of the [INotifications] to notify this [IObserver] of
   * Param [observer] - the [IObserver] to register
   */
  void registerObserver( String noteName, IObserver observer )
  {
    if( observerMap[ noteName ] == null ) {
      observerMap[ noteName ] = new List<IObserver>();
    }
    observerMap[ noteName ].add( observer );
  }


  /**
   * Notify the [IObservers] for a particular [INotification].
   * 
   * All previously attached [IObservers] for this [INotification]'s
   * list are notified and are passed a reference to the [INotification] in 
   * the order in which they were registered.
   * 
   * Param [note] - the [INotification] to notify [IObservers] of.
   */
  void notifyObservers( INotification note )
  {
    if( observerMap[ note.getName() ] != null ) 
    {
      // Get a reference to the observers list for this notification name
      List<IObserver>observers_ref = observerMap[ note.getName() ];
  
      // Copy observers from reference array to working array, 
      // since the reference array may change during the notification loop
      List<IObserver> observers; 
      IObserver observer;
      for (var i = 0; i < observers_ref.length; i++) { 
        observer = observers_ref[ i ];
        observers.add( observer );
      }
        
      // Notify Observers from the working array                
      for (var i = 0; i < observers.length; i++) {
          observer = observers[ i ];
          observer.notifyObserver( note );
      }
    }
  }
                  
  /**
   * Remove an [IObserver] from the observer list for a given [Notification] name.
   * 
   * Param [notificationName] - which observer list to remove from 
   * Param [notifyContext] - remove the observers with this object as their notifyContext
   */
  void removeObserver( String notificationName, Object notifyContext )
  {
      // the observer list for the notification under inspection
      List<IObserver> observers = observerMap[ notificationName ];

      // find the observer for the notifyContext
      for ( var i=0; i<observers.length; i++ ) 
      {
          if ( observers[i].compareNotifyContext( notifyContext ) == true ) 
          {
              // there can only be one Observer for a given notifyContext 
              // in any given Observer list, so remove it and break
              observers.removeRange(i, 1);
              break;
          }
      }

      // Also, when a Notification's Observer list length falls to 
      // zero, delete the notification key from the observer map
      if ( observers.length == 0 ) {
          observerMap[ notificationName ] = null;        
      }
  } 

  /**
   * Register an [IMediator] instance with the [View].
   * 
   * Registers the [IMediator] so that it can be retrieved by name,
   * and further interrogates the [IMediator] for its 
   * [INotification] interests.
   * 
   * If the [IMediator] returns any [INotification] 
   * names to be notified about, an [Observer] is created encapsulating 
   * the [IMediator] instance's [handleNotification] method 
   * and registering it as an [Observer] for all [INotifications] the 
   * [IMediator] is interested in.
   * 
   * Param [mediatorName] - the name to associate with this [IMediator] instance
   * Param [mediator] - a reference to the [IMediator] instance
   */
  void registerMediator( IMediator mediator )
  {
  
    // do not allow re-registration (you must to removeMediator fist)
    if ( mediatorMap[ mediator.getMediatorName() ] != null ) return;
    
    mediator.initializeNotifier( multitonKey );

    // Register the Mediator for retrieval by name
    mediatorMap[ mediator.getMediatorName() ] = mediator;
    
    // Get Notification interests, if any.
    List<String> interests = mediator.listNotificationInterests();

    // Register Mediator as an observer for each notification of interests
    if ( interests.length > 0) 
    {
      // Create Observer referencing this mediator's handlNotification method
      IObserver observer = new MVCObserver( mediator.handleNotification, mediator );

      // Register Mediator as Observer for its list of Notification interests
      for ( var i=0;  i<interests.length; i++ ) {
          registerObserver( interests[i],  observer );
      }            
    }
    
    // alert the mediator that it has been registered
    mediator.onRegister();
  }

  /**
   * Retrieve an [IMediator] from the [View].
   * 
   * Param [mediatorName] - the name of the [IMediator] instance to retrieve.
   * Returns the [IMediator] instance previously registered in this core with the given [mediatorName].
   */
  IMediator retrieveMediator( String mediatorName )
  {
      return mediatorMap[ mediatorName ];
  }

  /**
   * Remove an [IMediator] from the [View].
   * 
   * Param [mediatorName] - name of the [IMediator] instance to be removed.
   * Returns the [IMediator] that was removed from this core's [IView]
   */
  IMediator removeMediator( String mediatorName )
  {
      // Retrieve the named mediator
      IMediator mediator = mediatorMap[ mediatorName ];
      
      if ( mediator != null ) 
      {
        // for every notification this mediator is interested in...
        List<String> interests = mediator.listNotificationInterests();
        for ( var i=0; i<interests.length; i++ ) 
        {
          // remove the observer linking the mediator 
          // to the notification interest
          removeObserver( interests[i], mediator );
        }    
        
        // remove the mediator from the map        
        mediatorMap[ mediatorName ] = null;

        // alert the mediator that it has been removed
        mediator.onRemove();
      }
      
      return mediator;
  }
                  
  /**
   * Check if a [Mediator] is registered or not
   * 
   * Param [mediatorName]
   * Returns [bool] - whether a [Mediator] is registered in this core with the given [mediatorName].
   */
  bool hasMediator( String mediatorName )
  {
      return mediatorMap[ mediatorName ] != null;
  }

  /**
   * Remove an IView instance
   * 
   * @param multitonKey of IView instance to remove
   */
  static void removeView( String key )
  {
      instanceMap[ key ] = null;
  }
  
  // Mapping of Mediator names to Mediator instances
  Map<String,IMediator> mediatorMap;

  // Mapping of Notification names to Observer lists
  Map<String,List<IObserver>> observerMap;
  
  // Multiton instance map
  static Map<String,IView> instanceMap;

  // The Multiton Key for this Core
  String multitonKey;
}

class ViewExistsError {
  const ViewExistsError();

  String toString() {
    return "View instance for this Multiton key already constructed!";
  }
}

