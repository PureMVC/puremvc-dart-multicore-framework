/**
 * A base [ICommand] implementation for executing a block of business logic.
 *  
 * Your subclass should override the [execute] method where your 
 * business logic will handle the [INotification].
 * 
 * See [ICommand], [IController], [INotification], [MacroCommand], [INotifier]
 */
class MVCSimpleCommand extends MVCNotifier implements ICommand
{
      
  /** 
   * Respond to the [INotification] that triggered this [MVCSimpleCommand].
   * 
   * 
   * In the Command Pattern, an application use-case typically
   * begins with some user action, which results in an [INotification] 
   * being broadcast, which is handled by business logic in the [execute]
   * method of an [ICommand].</P>
   * 
   * Param [note] - an [INotification] object that triggered the execution of this [MVCSimpleCommand]
   */
  void execute( INotification note ){ }                            

}