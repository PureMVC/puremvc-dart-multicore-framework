/**
 * The interface definition for a PureMVC [SimpleCommand] or [MacroCommand]
 *
 * See [INotification]
 */
interface ICommand extends INotifier
{
  /**
   * Execute the [ICommand]'s logic to handle a given [INotification].
   * 
   * Param [note] - an [INotification] to handle.
   */
  void execute( INotification note );
}
