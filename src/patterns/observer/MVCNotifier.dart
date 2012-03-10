/**
 * A Base [INotifier] implementation.
 * 
 * [MacroCommand], [SimpleCommand], [Mediator], and [Proxy] 
 * all have a need to send [Notifications]. 
 * 
 * The [INotifier] interface provides a common method called
 * [sendNotification] that relieves implementation code of 
 * the necessity to actually construct [INotification]s.
 * 
 * The [Notifier] class, which all of the above mentioned classes
 * extend, provides an initialized reference to an [IFacade]
 * Multiton, which is required by the convienience method
 * for sending [INotification]s, but also eases implementation as these
 * classes have frequent [Facade] interactions and usually require
 * access to the facade anyway.
 * 
 * NOTE: In the MultiCore version of the framework, there is one caveat to
 * [Notifier]s, they cannot send notifications or reach the facade until they
 * have a valid multitonKey. 
 * 
 * The multitonKey is set:
 *   * on a [ICommand] when it is instantiated by the [Controller]
 *   * on a [IMediator] when it is registered with the [IView]
 *   * on a [IProxy] when it is registered with the [IModel]
 * 
 * See [MVCProxy], [MVCFacade], [MVCMediator], [MVCMacroCommand], [MVCSimpleCommand]
 */
class MVCNotifier implements INotifier
{
  
    MVCNotifier(){
      
    }
  
    /**
     * Send an [INotification].
     * 
     * Convenience method to prevent having to construct new 
     * [INotification] instances in our implementation code.
     * 
     * -  Param [noteName] the name of the note to send
     * -  Param [body] - the body of the note (optional)
     * -  Param [type] - the type of the note (optional)
     */ 
    void sendNotification( String noteName, [Dynamic body, String type] )
    {
        if (facade != null) 
            facade.sendNotification( noteName, body, type );
    }
    
    /**
     * Initialize this [INotifier] instance.
     * 
     * This is how a [INotifier] gets its [multitonKey]. 
     * Calls to [sendNotification] or access to the
     * [facade] will fail until after this method 
     * has been called.
     * 
     * -  Param [key] - the Multiton key for this [INotifier].
     */
    void initializeNotifier( String key )
    {
        multitonKey = key;
    }
    
    // Return the Multiton Facade instance 
    IFacade get facade()
    {
        if ( multitonKey == null ) throw new NotifierLacksMultitonKeyError( );
        return MVCFacade.getInstance( multitonKey );
    }
    
    // The Multiton Key for this app
    String multitonKey;
}

class NotifierLacksMultitonKeyError {
  const NotifierLacksMultitonKeyError();

  String toString() {
    return "multitonKey for this Notifier not yet initialized!";
  }
}
